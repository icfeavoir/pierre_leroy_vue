<template>

	<div>
		<div class="big-container container-choices" v-if="!questionsDone">
			<div class="vertical-center choices">
				<p class="question">{{ question }}</p>
				<div class="question-underline-off"></div>
				<div class="choices-buttons">
					<span  v-for="(range, index) in ranges" :key="'range-' + index">
						<Range :min="range.min" :max="range.max" :step="range.step" v-model="rangeValue" v-on:range-changed="rangeChanged"/>
					</span>
					<span  v-for="(button, index) in buttons" :key="'button-' + index">
						<Button :id="button.id" :help="button.help" v-on:click.native="buttonClicked(button.id, button.price, button.num, button.back || false)">
							<span v-html="button.text"></span>
						</Button>
					</span>
				</div>
			</div>
			<div class="progress-bar"><div class="progress-bar-filled" :style="{'width': currentPercent + '%'}">{{ currentPercent }}%</div></div>
		</div>

		<div class="big-container" v-if="showPrices">
			<div class="vertical-center final final-new">
				<p>Votre devis est compris entre {{ this.priceMin }}€ et {{ this.priceMax }}€</p>
				<button class="button-choice" v-on:click="restart()"><i class="fa fa-undo"></i> Recommencer</button>
				<button class="button-choice" v-on:click="goToSendForm()"><i class="fa fa-paper-plane"></i> Envoyer la demande de devis</button>
			</div>
		</div>

		<div class="big-container total" v-if="sendPriceRequest">
			<div class="request request-new row">
				<div class="col-lg-12">
					<p>Les informations que vous avez saisies sont enregistrées. Merci de remplir les informations ci-dessous et de les accompagner d'un message expliquant plus en détail votre projet.</p><br>
				</div>
				<div class="col-lg-6">
					<div class="input-bloc"><label>Prénom</label><br><input name="firstName" v-model="firstName" required placeholder="Prénom" /></div>
					<div class="input-bloc"><label>Nom</label><br><input name="lastName" v-model="lastName" required placeholder="Nom" /></div>
					<div class="input-bloc"><label>Email</label><br><input name="mail" v-model="email" required placeholder="Email" /></div>
				</div>
				<div class="col-lg-6">
					<div class="input-bloc"><label>Votre message</label><br><textarea rows="8" class="msg" v-model="userMsg"></textarea></div>
				</div>
				
				<div class="col-lg-12 text-center">
					<p v-if="errorForm != null" class="error-form">{{ errorForm }}</p>
					<button class="button-choice" v-on:click="restart()" :disabled="buttonSendDisable"><i class="fa fa-undo"></i> Recommencer</button>
					<button class="button-choice" type="submit" :disabled="buttonSendDisable"  v-on:click="sendForm()"><i class="fa fa-paper-plane"></i> {{ buttonSendText }}</button>
				</div>
			</div>
		</div>

		<div class="big-container" v-if="sendSucceed">
			<div class="vertical-center request text-center">
				<div class="col-lg-12">
					<p>Devis envoyé avec succès, nous vous répondrons sous les meilleurs délais.</p>
					<a href="/"><button class="button-choice">Retour sur le site</button></a>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
import Button from './components/Button.vue'
import Range from './components/Range.vue'
import data from './price.json'
import axios from "axios"

const TIME = 1200

export default {
	name: 'price',
	components: {
		Button,
		Range
	},
	mounted() {
		this.nextChoice(this.currentQuestion)
	},

	data() {
		return {
			data: data,
			currentQuestion: "0",
			prevQuestions: [],
			question: '',
			backButton: {id:"-1", text: "<i class='fa fa-undo'></i> Retour", price: 0, back: true},
			buttons: [],
			ranges: [],
			priceMin: 0,
			priceMax: 0,
			currentPercent: 0,
			rangeValue: 0,
			questionToAnswer: {},

			questionsDone: false,		// les questions
			showPrices: false,			// affichage du prix final
			sendPriceRequest: false,	// affichage du formulaire
			sendSucceed: false,			// affichage final

			buttonSendDisable: false,
			buttonSendText: 'Envoyer',

			firstName: "test",
			lastName: "test",
			email: "test@t.fr",
			userMsg: "test",
			errorForm: null,
		}
		
	},
	computed: {
		prevQuestion: function() {
			return this.prevQuestions[this.prevQuestions.length - 1] || "0"
		}
	},
	methods: {
		nextChoice: function(currentQuestion) {
			
			// on récupère la question suivante
			var prop = this.getQuestionById(currentQuestion)

			if (prop === undefined) {
				// c'est fini
				$(".choices").removeClass("choice-new")
				$(".choices").addClass("choice-done")
				return true
			}

			// Copie du tableau pour éviter de modifier la variable
			prop = $.extend( true, {}, prop)
      
			var slider = []
			if (prop.type == "slider") {
				var min = prop.min || 1
				var max = prop.max || 2
				var step = prop.step || 1
				slider.push({
					'min': min,
					'max': max,
					'step': step,
				})
				
				// ajout du bouton pour valider
				if (!prop.c) {
					prop.c = []
				}
				prop.c.push({id: "1", text: "Valider !", price: (prop.price || 0)})
			}

			// Ajout du bouton "Retour"
			var backAdded = false
			if (currentQuestion != "0") {
				prop.c.unshift(this.backButton)
				backAdded = true
			}

			// ajout des autres boutons
			var buttons = []
			for (var i in prop.c) {
				var count = Number(i)
				var choice = prop.c[i].text || "no text"
				var help = prop.c[i].help || null
				var price = prop.c[i].price || 0
				var back = prop.c[i].back || false

				var backCount = backAdded ? 0 : 1	// selon le bouton Retour, ça change l'id du bouton
				var buttonNum = i - backAdded ? 1 : 0 // le bouton retour ne compte pas

				// ancienne question + "." + si decisionnel ? l'ordre compte (quelle question suivante ?) : sinon il vaut 1 (on va direct à la question suivante)
				var nextQuestion = currentQuestion
				if (prop.decision) {
					// on rajoute un bloc et on prend la première du nouveau bloc
					nextQuestion += "." + (count + backCount) + ".1"
				} else {
					if (prop.next) {
						// on a l'indication du bloc obligatoire suivant
						nextQuestion = prop.next
					} else {
						// on reste dans le même bloc
						var prevBloc = currentQuestion.split(".")
						var currentBlocNumber = Number(prevBloc.pop())
						// on incrémente juste le num de la question
						currentBlocNumber++
						nextQuestion = prevBloc.join(".") + "." + currentBlocNumber
					}
				}

				// si c'est le bouton retour
				if (backAdded && count == 0) {
					nextQuestion = this.prevQuestion	// la 'nextQuestion' est en fait celle d'avant pour le Retour
				}
				buttons.push({
					'id': nextQuestion,
					'text': choice,
					'help': help,
					'price': price,
					'num': buttonNum,
					'back': back,
				})
			}
			
			const it = this
			setTimeout(function() {
				// animation
				$(".choices").removeClass("choice-done")
				$(".choices").addClass("choice-new")

				$(".question-underline-off").removeClass("question-underline")
				setTimeout(() => { $(".question-underline-off").addClass("question-underline") }, 10)

				it.question = prop.q
				it.ranges = slider
				it.buttons = buttons;
			}, TIME)
		},

		setRangeValue: function(val) {
			$('p#range-value').text(val)
		},

		rangeChanged: function(val) {
			this.rangeValue = val
		},

		buttonClicked: function(choice, price, num, isBack = false) {
			// enregistrer la réponse
			if (!isBack) {
				this.questionToAnswer[this.currentQuestion] = num
				// si range
				if (this.ranges.length > 0) {
					price *= this.rangeValue
					this.questionToAnswer[this.currentQuestion] = this.rangeValue
				}

				// on récupère les prix selon le choix
				if (Array.isArray(price) && price.length == 2) {
					this.priceMin += price[0]
					this.priceMax += price[1]
				} else if (typeof price === 'number'){
					this.priceMin += price
					this.priceMax += price
				}

				// et on change la question
				this.prevQuestions.push(this.currentQuestion)
				this.currentQuestion = choice
			} else {
				// BOUTON RETOUR

				// on annule le prix précédant
				var question = this.getQuestionById(this.prevQuestion)
				var prevPrice = question.price
				if (question.type === "slider") {
					// range
					prevPrice = prevPrice * this.questionToAnswer[question.qid]	// on multiplie par la valeur qui était choisie
					if (prevPrice) {
						this.priceMin -= prevPrice
						this.priceMax -= prevPrice
					}
				} else {
					// le prix dépend du choix fait
					
					var selectedChoice = question.c[this.questionToAnswer[question.qid]]
					prevPrice = selectedChoice.price
					if (prevPrice) {
						// intervalle
						this.priceMin -= prevPrice[0]
						this.priceMax -= prevPrice[1]
					}
				}

				// on annule la réponse précedante
				delete this.questionToAnswer[this.prevQuestion]
				this.currentQuestion = this.prevQuestion
				this.prevQuestions.pop()
			}

			this.setPercent()

			$(".choices").removeClass("choice-new")
			$(".choices").addClass("choice-done")
			var done = this.nextChoice(this.currentQuestion)
			
			if (done) {
				setTimeout(() => {
					this.buttons = []
					this.ranges = []
					this.questionsDone = true
					this.showPrices = true
				}, TIME);
			}
		},

		getQuestionById: function(id) {
			return this.data.filter(q => q.qid == id)[0]
		},

		restart: function() {
			this.currentQuestion = "0"
			this.prevQuestions = []
			this.question = ''
			this.priceMin = 0
			this.priceMax = 0
			this.rangeValue = 0
			this.doneQuestions = {}
			this.questionToAnswer = {}

			this.questionsDone = false		// les questions
			this.showPrices = false			// affichage du prix final
			this.sendPriceRequest = false	// affichage du formulaire
			this.sendSucceed = false			// affichage final

			this.buttonSendDisable = false
			this.buttonSendText = 'Envoyer'

			this.setPercent(0)
			this.nextChoice(this.currentQuestion)
		},

		setPercent: function(directValue = null) {
			if (directValue !== null) {
				this.currentPercent = directValue
				return
			}

			// nombre max de questions restantes
			var doneQuestions = Object.keys(this.questionToAnswer).length
			var totalQuestions = this.data.filter(q => q.qid.includes(this.removeLastNum(this.currentQuestion))).length + doneQuestions
			var blocQuestionNumber = Number(this.getLastNum(this.currentQuestion))
			totalQuestions -= (blocQuestionNumber - 1)	// si on est à la question 1.2.3, on enlève les deux questions précédentes dans le compte

			var percent = 0
			if (totalQuestions == 0) {
				percent = 100
			} else if (this.currentQuestion === "0") {
				percent = 0
			} else {
				percent = Math.round(doneQuestions * 100 / totalQuestions)
			} 

			if (percent > 100) {
				percent = 100
			}

			var operator = 1
			if (this.currentPercent > percent) {
				operator = -1
			}
			var id = setInterval(frame, 25);
			var it = this
			function frame() {
				if (it.currentPercent == percent) {
					clearInterval(id)
				} else {
					it.currentPercent += operator
				}
			}
		},

		goToSendForm: function() {
			$(".final").removeClass("final-new")
			$(".final").addClass("final-done")
			setTimeout(() => {
				this.showPrices = false
				this.sendPriceRequest = true
			}, TIME)
		},

		sendForm: function() {
			// on bloque le bouton d'envoie en attendant qu'il s'envoie
			this.buttonSendDisable = true
			this.buttonSendText = "Envoi..."

			var summary = ""
			for (var qid in this.questionToAnswer) {
				var resNum = this.questionToAnswer[qid]
				var question = this.data.filter(q => q.qid == qid)[0]
				if (question && question.qid) {	// si on a trouvé la question
					summary += question.q + ": "
					if (question.type == "buton") {
						summary += question.c[resNum].text + "\n"
					} else {
						// range
						summary += resNum + "\n"
					}
				}
			}

			// verif des champs
			var fields = ["Prénom", "Nom", "Email", "Message"]
			var fieldsVar = [this.firstName, this.lastName, this.email, this.msg]
			for (var i in fieldsVar) {
				if (fieldsVar[i] === "") {
					this.errorForm = "Veuillez saisir le champ " + fields[i]
					return
				}
			}

			// verif email
			if (!this.validateEmail(this.email)) {
				this.errorForm = "Email invalide"
				return
			}

			this.errorForm = ""
			
			var data = {
				firstName: this.firstName,
				lastName: this.lastName,
				email: this.email,
				msg: this.userMsg,
			}

			// html with css in mail
			var msg = "Une nouvelle demande de devis a été envoyée par <b>" + data.firstName + " " + data.lastName + "</b>.<br>"
			msg += "Les choix de cette personne : <br><br>"
			msg += "<table style='margin: 10px; width: 80%; border: 1px solid black; border-collapse: collapse; text-align: center'>"
				msg += "<tr>"
					msg += "<th style='background-color: navy; color: white; padding: 15px; border: 1px solid black; border-collapse: collapse;'>Question</th>"
					msg += "<th style='background-color: navy; color: white; padding: 15px; border: 1px solid black; border-collapse: collapse;'>Réponse</th>"
					msg += "<th style='background-color: navy; color: white; padding: 15px; border: 1px solid black; border-collapse: collapse;'>Prix min</th>"
					msg += "<th style='background-color: navy; color: white; padding: 15px; border: 1px solid black; border-collapse: collapse;'>Prix max</th>"
				msg += "</tr>"

			for (var i in this.questionToAnswer) {
				var question = this.getQuestionById(i)
				var response = this.questionToAnswer[i]
				var responsePrice = [0, 0]
				
				if (question.type === "slider") {
					var qPrice = question.price || 0
					responsePrice[0] += response * qPrice
					responsePrice[1] += response * qPrice
				} else {
					var qPrice = question.c[response].price || 0
					if (Array.isArray(qPrice) && qPrice.length == 2) {
						responsePrice[0] += qPrice[0]
						responsePrice[1] += qPrice[1]
					} else if (typeof price === 'number'){
						responsePrice[0] += qPrice
						responsePrice[1] += qPrice
					}
					response = question.c[response].text
				}

				msg += "<tr>"
					msg += "<td style='padding: 15px; border: 1px solid black; border-collapse: collapse;'>" + question.q + "</td>"
					msg += "<td style='padding: 15px; border: 1px solid black; border-collapse: collapse;'>" + response + "</td>"
					msg += "<td style='padding: 15px; border: 1px solid black; border-collapse: collapse;'>" + responsePrice[0] + "</td>"
					msg += "<td style='padding: 15px; border: 1px solid black; border-collapse: collapse;'>" + responsePrice[1] + "</td>"
				msg += "</tr>"
			}

			msg += "<tr>"
				msg += "<td colspan=2 style='background-color: dodgerblue; color: white; padding: 15px; border: 1px solid black; border-collapse: collapse;'>Prix total</td>"
				msg += "<td style='background-color: dodgerblue; color: white; padding: 15px; border: 1px solid black; border-collapse: collapse;'>" + this.priceMin + "</td>"
				msg += "<td style='background-color: dodgerblue; color: white; padding: 15px; border: 1px solid black; border-collapse: collapse;'>" + this.priceMax + "</td>"
			msg += "</tr>"

			msg += "</table>"

			msg += "<br>Le contact : <b>" + data.firstName + " " + data.lastName+"</b> - <a href=mailto:" + data.email + ">" + data.email + "</a><br><br>"

			msg += "Message du contact :<br><i>" + data.msg + "</i><br><br>"

			msg += "<b>Pierre & Kévin.</b>"

			var params = {
				fromMail: "do-not-reply@mail.com",
				fromName: "Pierre & Kévin",
				toMail: ["pierre.leroy.mail@gmail.com", "kevin.pottier@orange.fr"],
				toName: ["Pierre Le Boss", "Kévin Le Boss"],
				subject: "Nouvelle demande de devis !!!",
				body: msg,
			}

			const it = this
			$.post("http://mailer.pierre-leroy.fr", params, function(e) {
				if (e === "1") {
					it.sendPriceRequest = false
					it.sendSucceed = true
				} else {
					alert('Une erreur est survenue, merci de réessayer plus tard.')
				}
			})
		},

		removeLastNum: function(id) {
			var list = id.split(".")
			list.pop()
			return list.join(".")
		},

		getLastNum: function(id) {
			var list = id.split(".")
			return list[list.length - 1]
		},

		validateEmail: function(email) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(email).toLowerCase());
		}
	}
}

</script>

<style lang="scss">
    @import './scss/price.scss';
</style>