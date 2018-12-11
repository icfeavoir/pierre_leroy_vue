<template>

  	<div>
	  	<Menu />
		  
		<div class="full" id="main">
			<div id="main-shape">
				<div style="display: inline-block; margin-top: -10vh; margin-bottom: 10vh"></div> <!-- Menu scroll -->
				<div id="me-img-container"><img id="me-img" class="show-img-animation" alt="me" src="./assets/me.jpg" /></div>
				<p class="name"><b>Pierre LEROY</b></p>
				<p>{{ age }} ans − Actuellement en 5<sup>ème</sup> année d'ingénieur à l'<a target="_blank" href="https://eseo.fr">ESEO</a> et en alternance à <a target="_blank" href="https://oet.fr">OET</a></p>
				<div id="svg"><Draw :speed="-1"/></div>
			</div>
		</div>
		
		<b-g-parallax id="achievments-split" url="achievments.jpg" title="Expérience" credit="Photo by Samuel Zeller on Unsplash" />

		<div class="text-center" id="achievments">
			<div style="margin-top: -10vh; margin-bottom: 10vh"></div> <!-- Menu scroll -->
            <Card :direction=1 date="Septembre − Novembre 2017" url="https://youpic.com" title="YouPic">
				Stage technique − Développement Web (3 mois)<br>
				Frontend (React) & backend (MySQL, Kotlin, PHP)
			</Card>
            <Card :direction=-1 date="Janvier − Juin 2018" title="Projet SE">
				Projet d'école option Systèmes Embarqués<br>
				Spécification, Conception & Développement Android (Java)
			</Card>
            <Card :direction=1 date="2016 − 2018" url="https://seio.org" title="SEIO">
				DSI de la Junior-Entreprise de l'ESEO<br>
				Suivi de projet & Développement d'un intranet (PHP, MySQL, JavaScript)
			</Card>
            <Card :direction=-1 date="Août 2015" url="https://informatique.e-pro.fr/sarthe/modularis_f785537" title="Modularis">
				Stage de programmation (1 mois)<br>
				Développement d’un intranet pour la gestion des SAV (HTML, CSS, JS, PHP)
			</Card>
            <Card :direction=0 date="Été 2012 à 2018" url="https://actu.fr/pays-de-la-loire/sille-le-guillaume_72334/saint-germain-de-coulamer-le-centre-de-loisirs-fete-ses-30-ans_10433330.html" title="Centre Aéré">
				Animateur en centre aéré
			</Card>
		</div>

		<b-g-parallax id="skills" url="skills.jpg" title="Compétences" credit="Photo by Jaredd Craig on Unsplash" :title-on-top=true>
			<div style="margin-top: -10vh; margin-bottom: 10vh"></div> <!-- Menu scroll -->
			<div id="balls">
				<Ball text="HTML" size=80 textColor="white" bgColor="#F06529" posX=10 posY=10 />
				<Ball text="CSS" size=60 textColor="white" bgColor="#264de4" posX=15 posY=40 />
				<Ball text="PHP" size=85 textColor="white" bgColor="#4f5b93" posX=70 posY=20 />
				<Ball text="Java" size=75 textColor="white" bgColor="#FFA518" posX=80 posY=70 />
				<Ball text="NodeJS" size=50 textColor="white" bgColor="#215732" posX=10 posY=80 />
				<Ball text="SQL" size=60 textColor="white" bgColor="#00758f" posX=60 posY=60 />
				<Ball text="Android" size=60 textColor="white" bgColor="#a4c639" posX=50 posY=75 />
				<Ball text="Laravel" size=80 textColor="white" bgColor="#ff4b26" posX=28 posY=70 />
				<Ball text="Linux" size=60 textColor="#fdfdfb" bgColor="black" posX=40 posY=5 />
				<Ball text="JS" size=65 textColor="#35495e" bgColor="#f7df1e" posX=38 posY=40 />
				<Ball text="Vue.js" size=50 textColor="#35495e" bgColor="#41b883" posX=56 posY=30 />
			</div>
		</b-g-parallax>

		<div class="full" id="about">
			<div id="about-shape">
				<p class="title">Loisirs</p>
				
				<card-shadow :direction=1 title="Football">
					<gif />
				</card-shadow>
			</div>
		</div>

		<b-g-parallax id="contact-split" url="contact.jpg" title="Contact" credit="Photo by Marko Pekić on Unsplash" />

		<div class="full" id="contact">
		</div>

    </div>

</template>

<script>
import Ball from './components/Ball.vue'
import Card from './components/Card.vue'
import CardShadow from './components/CardShadow.vue'
import BGParallax from './components/BGParallax.vue'
import Draw from './components/Draw.vue'
import SideParallax from './components/SideParallax.vue'
import Menu from './components/Menu.vue'
import Gif from './components/Gif.vue'

export default {
	name: 'app',
	components: {
		Ball,
		Card,
		CardShadow,
		BGParallax,
		Draw,
		SideParallax,
		Menu,
		Gif,
  	},
	mounted() {
		new Parallax($('#balls').get(0), {
			hoverOnly: false,
		});
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
	computed: {
		age: () => {
			const birthday = new Date("1996-07-12");
			return new Date(Date.now() - birthday).getFullYear() - 1970;
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
</style>