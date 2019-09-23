<template>

	<div>
		<div class="big-container container-choices" v-if="!questionsDone">
			<div class="vertical-center choices">
				<!-- <Button :id=1 text="fes" /> -->
				<p class="question">{{ question }}</p>
				<div class="question-underline-off"></div>
				<div class="choices-buttons">
					<span  v-for="(range, index) in ranges" :key="'range-' + index">
						<Range :min="range.min" :max="range.max" :step="range.step" v-model="rangeValue" v-on:range-changed="rangeChanged"/>
					</span>
					<span  v-for="(button, index) in buttons" :key="'button-' + index">
						<Button :id="button.id" :text="button.text" :help="button.help" v-on:click.native="buttonClicked(button.id, button.price, button.num, button.back || false)" />
					</span>
				</div>
			</div>
			<div class="progress-bar"><div class="progress-bar-filled" :style="{'width': currentPercent + '%'}">{{ currentPercent }}%</div></div>
			<!-- <p class="devis">Votre devis est compris entre {{ this.priceMin }} et {{ this.priceMax }}</p> -->
		</div>

		<div class="big-container" v-else>
			<div class="vertical-center final">
				<p>Votre devis est compris entre {{ this.priceMin }}€ et {{ this.priceMax }}€</p>
				<button class="button-choice" v-on:click="restart()">Recommencer</button>
				<button class="button-choice" v-on:click="send()">Envoyer la demande de devis</button>
			</div>
		</div>
	</div>

</template>

<script>
import Button from './components/Button.vue'
import Range from './components/Range.vue'
import data from './price.json'

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
			backButton: {id:"-1", text: "Back", price: 0, back: true},
			buttons: [],
			ranges: [],
			priceMin: 0,
			priceMax: 0,
			questionsDone: false,
			currentPercent: 0,
			rangeValue: 0,
			questionToAnswer: {},
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
					$("div.final").addClass("final-new") 
					this.questionsDone = true
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
			this.questionsDone = false
			this.doneQuestions = {}
			this.questionToAnswer = {}
			this.setPercent(0)
			this.nextChoice(this.currentQuestion)
		},

		send: function() {
			alert('send')
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

		removeLastNum: function(id) {
			var list = id.split(".")
			list.pop()
			return list.join(".")
		},

		getLastNum: function(id) {
			var list = id.split(".")
			return list[list.length - 1]
		},
	}
}

</script>

<style lang="scss">
    @import './scss/price.scss';
</style>