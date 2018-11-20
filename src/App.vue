<template>

  	<div>
		<div class="full diago-right" id="svg">
			<Draw :depth="-2"/>
		</div>

    	<div class="full diago-left under-diago" id="test">
      		<button id="switch-btn" v-on:click="changeLang">switch</button>
      		<p id="text-lang">{{ msg }}</p>
    	</div>

		<b-g-parallax class="under-diago" url="achievments.jpg" title="Réalisations" credit="Photo by Samuel Zeller on Unsplash" />

		<div class="diago-left text-center" id="card-container">
            <Card :direction=1 date="Septembre − Novembre 2017" title="YouPic">Stage technique − Développement Web<br>(frontend et backend)</Card>
            <Card :direction=-1 date="2016 − 2018" title="SEIO">Directeur des Systèmes d'Informations de la Junior-Entreprise de l'ESEO</Card>
            <Card :direction=1 date="Août 2015" title="Modularis">Stage de programmation − Développement d’un intranet pour la gestion des SAV</Card>
            <Card :direction=-1 date="Juillet 2014, 2015, 2016, 2017" title="Loisirs Pour Tous">Animateur de centre-aéré</Card>
		</div>

		<b-g-parallax class="under-diago" url="skills.jpg" title="Skills" credit="Photo by Jaredd Craig on Unsplash" />

		<div class="full" id="balls">
			<Ball text="HTML" size=80 textColor="white" bgColor="#F06529" posX=10 posY=10 />
			<Ball text="CSS" size=50 textColor="white" bgColor="#264de4" posX=15 posY=40 />
			<Ball text="PHP" size=80 textColor="white" bgColor="#4f5b93" posX=70 posY=20 />
			<Ball text="JS" size=65 textColor="black" bgColor="#f7df1e" posX=40 posY=5 />
			<Ball text="Java" size=70 textColor="white" bgColor="#FFA518" posX=80 posY=80 />
			<Ball text="NodeJS" size=50 textColor="white" bgColor="#215732" posX=10 posY=80 />
			<Ball text="SQL" size=60 textColor="white" bgColor="#00758f" posX=60 posY=60 />
			<Ball text="Android" size=60 textColor="white" bgColor="#a4c639" posX=50 posY=75 />
			<Ball text="Laravel" size=60 textColor="white" bgColor="#ff4b26" posX=28 posY=70 />
			<Ball text="Linux" size=70 textColor="#fdfdfb" bgColor="black" posX=38 posY=40 />
		</div>
    </div>

</template>

<script>
import Ball from './components/Ball.vue'
import Card from './components/Card.vue'
import BGParallax from './components/BGParallax.vue'
import Draw from './components/Draw.vue'
import SideParallax from './components/SideParallax.vue'

export default {
	name: 'app',
	components: {
		Ball,
		Card,
		BGParallax,
		Draw,
		SideParallax
  	},
	mounted() {
		new Parallax($('#balls').get(0));
		new Parallax($('#svg').get(0));
		this.msg = this.lang[this.selected];
	},
	data() {
		return {
			lang: {
				fr: "Dans le sud de l'Italie, le plus mauvais karatéka depuis Christian Estrosi dira aimer ne pas suggérer une figure à un chauffeur routier surexcité.",
				en: "In the south of Italy, the worst karateka since Christian Estrosi will say love not to suggest a figure to an overexcited truck driver.	",
			},
			selected: 'fr',
			msg: '',
		}
	},
	methods: {
		changeLang: async function() {
			if (this.selected == "en") {
				this.selected = "fr";
			} else {
				this.selected = "en";
			}
			var newSentence = this.lang[this.selected];
			var maxLen = Math.max(this.msg.length, newSentence.length);
			for (var i = 0; i < maxLen; i++) {
				await this.replaceLetter(this.msg, newSentence, i).then(res => {
					this.msg = res;
				});
			}
		},
		replaceLetter: async function(actual, newSentence, i) {
			return new Promise((resolve, reject) => {
				setTimeout(function() {
					if (actual[i] && newSentence[i]) {
						actual = actual.slice(0, i) + newSentence[i] + actual.slice(i+1);
					} else if (actual[i]) {
						// old is longer, we remove sup letters (one by one)
						actual = actual.substr(0, i);
					} else if (newSentence[i]) {
						// new is longer, we add supp letter
						actual += newSentence[i];
					}
					resolve(actual);
				}, 15);
			});
		},
	},
}

</script>

<style lang="scss">
  @import './scss/general.scss';
</style>

<style lang="scss" scoped>
    @import './scss/main.scss';

    #test {
      background-color: green;
      color: white;
	}

</style>