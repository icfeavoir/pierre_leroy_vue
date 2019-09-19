<template>

	<div class="container-choices">
		<div class="choices" v-if="!questionsDone">
			<!-- <Button :id=1 text="fes" /> -->
			<p class="question">{{ question }}</p>
			<div class="question-underline-off"></div>
			<div class="choices-buttons">
				<span  v-for="(range, index) in ranges" :key="'range-' + index">
					<Range :min="range.min" :max="range.max" :step="range.step" />
				</span>
				<span  v-for="(button, index) in buttons" :key="'button-' + index">
					<Button :id="button.id" :text="button.text" :help="button.help" v-on:click.native="buttonClicked(button.id, button.price)" />
				</span>
			</div>
		</div>

		<div v-else>
			Votre devis est compris entre {{ this.priceMin }} et {{ this.priceMax }}
		</div>
	</div>

</template>

<script>
import Button from './components/Button.vue'
import Range from './components/Range.vue'
import data from './price.json'

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
			question: '',
			backButton: {id:"-1", text: "Back", price: 0},
			buttons: [],
			ranges: [],
			priceMin: 0,
			priceMax: 0,
			questionsDone: false,
		}
		
	},
	methods: {
		nextChoice: function(currentQuestion) {
			
			// on récupère la question suivante
			var prop = this.getQuestionById(currentQuestion)

			// si on ne la trouve pas, c'est peut-être une question générale
			if (prop === undefined) {
				var potentialId = 
				prop = this.getQuestionById(this.getPreviousQuestionId(currentQuestion).res + ".*")
				if (prop) {
					// c'est decisionnel pour incrémenter le bloc dans le cas d'une *
					prop.decision = true
				}
			}

			if (prop === undefined) {
				// c'est fini
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

				var backCount = backAdded ? 0 : 1	// selon le bouton Retour, ça change l'id du bouton
				// ancienne question + "." + si decisionnel ? l'ordre compte (quelle question suivante ?) : sinon il vaut 1 (on va direct à la question suivante)
				var nextQuestion = currentQuestion
				if (prop.decision) {
					// on rajoute un bloc 
					nextQuestion += "." + (count + backCount)
				} else {
					// on reste dans le même bloc
					var currentBlocNumber = Number(this.getPreviousQuestionId(currentQuestion).lastValue)
					// on incrémente juste le num de la question
					currentBlocNumber++
					nextQuestion = this.getPreviousQuestionId(currentQuestion).res + "." + currentBlocNumber
				}

				// si c'est le bouton retour
				if (backAdded && count == 0) {
					nextQuestion = this.getPreviousQuestionId(currentQuestion).res	// la 'nextQuestion' est en fait celle d'avant pour le Retour
				}

				// console.log("nextQuestion: " + nextQuestion)
				buttons.push({
					'id': nextQuestion,
					'text': choice,
					'help': help,
					'price': price,
				})
			}
			
			const it = this
			setTimeout(function() {
				$(".choices").removeClass("choice-done")
				$(".question-underline-off").removeClass("question-underline")

				it.question = prop.q
				it.ranges = slider
				it.buttons = buttons;
				
				
				$(".choices").addClass("choice-new")
				$(".question-underline-off").addClass("question-underline")
			}, 1200)
		},

		setRangeValue: function(val) {
			$('p#range-value').text(val)
		},

		buttonClicked: function(choice, price) {
			// on récupère les prix selon le choix
			if (Array.isArray(price) && price.length == 2) {
				this.priceMin += price[0]
				this.priceMax += price[1]
			} else if (typeof price === 'number'){
				this.priceMin += price
				this.priceMax += price
			}

			this.currentQuestion = choice
			$(".choices").removeClass("choice-new")
			$(".choices").addClass("choice-done")
			this.questionsDone = this.nextChoice(this.currentQuestion)
		},

		rangeChanged: function(elem) {
			this.setRangeValue(elem.val())
		},

		getQuestionById: function(id) {
			return this.data.filter(q => q.qid == id)[0]
		},

		getPreviousQuestionId: function(id) {
			var prev = id.split(".")
			var lastValue = prev.pop() // on enlève le dernier élèment
			return {
				res: prev.join("."),
				lastValue: lastValue,
			}
		},
	}
}

</script>

<style lang="scss">
    @import './scss/price.scss';
</style>