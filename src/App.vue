<template>

	<div>
		<Menu />
		<div class="full" id="main">
			<div id="main-shape">
				<div style="display: inline-block; margin-top: -10vh; margin-bottom: 10vh"></div> <!-- Menu scroll -->
				<div id="me-img-container"><img id="me-img" class="show-img-animation" alt="me" src="./assets/me.jpg" /></div>
				<p class="name"><b>Pierre LEROY</b></p>
				<p>{{ age }} ans</p>
				<p>Diplômé de l'<a target="_blank" href="https://eseo.fr/">ESEO</a> − Grande École d'Ingénieurs Généralistes à Angers</p>
				<p>À la recherche d'opportunités de développeur fullstack à Rennes.</p>

				<div class="contact-all-data">
					<p class="contact-data"><i class='fa fa-phone'></i><a target="_blank" href="tel:0648444512">0648444512</a></p>
					<p class="contact-data"><i class='fa fa-envelope'></i><a target="_blank" href="mailto:'pierre.leroy.mail@gmail.com'">pierre.leroy.mail@gmail.com</a></p>
					<p class="contact-data"><i class='fa fa-github-square'></i><a target="_blank" href="https://github.com/icfeavoir">Mon GitHub</a></p>
				</div>
				<div id="svg"><Draw :speed="-1"/></div>
			</div>
		</div>
		
		<b-g-parallax id="achievments-split" url="achievments.jpg" title="Expérience" credit="Photo by Samuel Zeller on Unsplash" />

		<div class="text-center" id="achievments">
			<div style="margin-top: -10vh; margin-bottom: 10vh"></div> <!-- Menu scroll -->
				<Card :direction=1 date="Août 2020 − aujourd'hui" url="https://www.devmachine.fr/" title="DEVmachine">
					Développeur fullstack : développement de nouveaux écrans et fonctionnalités pour une application web de demandes de subvention. (Vue.js, Node)
				</Card>
				<Card :direction=-1 date="Septembre 2019 − aujourd'hui" url="https://www.facebook.com/boulangeriegalzin/" title="Micro-entrepreneur">
					Statut de micro-entrepreneur pour un client.<br>
					Développement d'un site de plannification pour le groupe GALZIN (Laravel)
				</Card>
				<Card :direction=1 date="Septembre 2018 − Septembre 2019" url="https://oet.fr" title="OET">
					Stage de fin d'étude en alternance (1 année)<br>
					Conception et réalisation de MES
				</Card>
				<Card :direction=-1 date="Septembre − Novembre 2017" url="https://youpic.com" title="YouPic">
					Stage technique − Développement Web (3 mois)<br>
					Frontend (React) & backend (MySQL, Kotlin, PHP)
				</Card>
				<Card :direction=1 date="Janvier − Juin 2018" title="Projet SE">
					Projet d'école option Systèmes Embarqués<br>
					Spécification, Conception, Développement Android (Java) & Tests
				</Card>
				<Card :direction=-1 date="2016 − 2018" url="https://seio.org" title="SEIO">
					DSI de la Junior-Entreprise de l'ESEO<br>
					Suivi de projet & Développement d'un intranet (PHP, MySQL, JavaScript)
				</Card>
		</div>

		<b-g-parallax id="skills" url="skills.jpg" title="Compétences" credit="Photo by Jaredd Craig on Unsplash" :title-on-top=true>
			<div style="margin-top: -10vh; margin-bottom: 10vh"></div> <!-- Menu scroll -->
			<div id="balls">
				<Ball text="HTML" size=80 textColor="white" bgColor="#F06529" posX=10 posY=10 />
				<Ball text="CSS" size=60 textColor="white" bgColor="#264de4" posX=12 posY=40 />
				
				<Ball text="JS" size=65 textColor="#35495e" bgColor="#f7df1e" posX=28 posY=70 />
				<Ball text="NodeJS" size=55 textColor="white" bgColor="#215732" posX=20 posY=80 />
				<Ball text="Vue.js" size=80 textColor="#35495e" bgColor="#41b883" posX=30 posY=35 />
				<Ball text="Angular" size=50 textColor="white" bgColor="#dd1b16" posX=26 posY=15 />
				<Ball text="React" size=50 textColor="white" bgColor="#61DBFB" posX=35 posY=15 />

				<Ball text="PHP" size=70 textColor="white" bgColor="#4f5b93" posX=45 posY=10 />
				<Ball text="Laravel" size=75 textColor="white" bgColor="#ff4b26" posX=38 posY=50 />

				<Ball text="SQL" size=60 textColor="white" bgColor="#00758f" posX=50 posY=75 />
				<Ball text="MongoDB" size=60 textColor="white" bgColor="#3FA037" posX=50 posY=55 />
				<Ball text="Python" size=40 textColor="#4584b6" bgColor="#ffde57" posX=62 posY=10 />
				<Ball text="Java" size=65 textColor="white" bgColor="#FFA518" posX=60 posY=30 />
				<Ball text="Android" size=60 textColor="white" bgColor="#a4c639" posX=60 posY=60 />

				<Ball text="Linux" size=60 textColor="#fdfdfb" bgColor="black" posX=70 posY=20 />
				<Ball text="Git" size=50 textColor="#fafafa" bgColor="#c9510c" posX=80 posY=50 />
			</div>
		</b-g-parallax>

		<div class="full" id="about">
			<div id="about-shape">
				<p class="title" id="about-start">Loisirs</p>
				<card-shadow :direction=1 title="Football"><p>Joueur en club amateur</p><gif url="soccer.webp" /></card-shadow>
				<card-shadow :direction=1 title="Théâtre"><p class="text-justify">Membre d'une association de théâtre pendant 8 ans dont 3 ans de présidence. Écriture, mise en scène et représentations annuelles par une vingtaine de personnes ayant entre 15 et 25 ans.</p><gif url="theater.gif" /></card-shadow>
				<card-shadow :direction=1 title="Développement"><p>Développement informatique depuis mes 14 ans</p><gif url="dev.webp" /></card-shadow>
			</div>
		</div>
<!-- 
		<b-g-parallax id="contact-split" url="contact.jpg" title="Contact" credit="Photo by Marko Pekić on Unsplash" />

		<div class="full" id="contact">
		</div> -->

    </div>

</template>

<script>
import Ball from './components/Ball.vue'
import Card from './components/Card.vue'
import CardShadow from './components/CardShadow.vue'
import BGParallax from './components/BGParallax.vue'
import Draw from './components/Draw.vue'
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
			return new Promise((resolve) => {
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