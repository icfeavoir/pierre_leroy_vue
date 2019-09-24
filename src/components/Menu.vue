<template>
    <div id="menu">
        <ul>
            <li>
                <a class="menu-choice"  href="#main">
                <div class="little-btn active"></div><span class="menu-text">Top</span>
                </a>
            </li>
            <li>
                <a class="menu-choice"  href="#achievments">
                <div class="little-btn"></div><span class="menu-text">Expérience</span>
                </a>
            </li>
            <li>
                <a class="menu-choice"  href="#skills">
                <div class="little-btn"></div><span class="menu-text">Compétences</span>
                </a>
            </li>
            <!-- <li>
                <a class="menu-choice"  href="#about">
                <div class="little-btn"></div><span class="menu-text">À Propos</span>
                </a>
            </li>
            <li>
                <a class="menu-choice"  href="#contact">
                <div class="little-btn"></div><span class="menu-text">Contact</span>
                </a>
            </li> -->
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Menu',
    props: {
        title: Array,
        divs: Array,
    },
    computed: {
    },
    mounted() {
        // initial state
        if (window.innerWidth > window.innerHeight) {
            // rebind if landscape mode
            $('.menu-choice').hover(
            () => {$('.menu-text').css({opacity: 1})},
            () => {$('.menu-text').css({opacity: 0})}
            )
        }

        // ON RESIZE (MANAGIN LANDSCAPE - PORTRAIT)
        $( window ).on( "resize", function( event ) {
            // unbind
            $('.menu-text').unbind('hover');
            if (window.innerWidth > window.innerHeight) {
                // rebind if landscape mode
                $('.menu-choice').hover(
                () => {$('.menu-text').css({opacity: 1})},
                () => {$('.menu-text').css({opacity: 0})}
                )
            }
        });

        $('.menu-choice').click(function(e) {
            e.preventDefault();
            $('.little-btn').removeClass('active');
            $(this).children('.little-btn').addClass('active');
            var div = $($(this).attr('href')); // Page cible
            var speed = 1000; // Durée de l'animation (en ms)
            $('html, body').animate( { scrollTop: div.children().first().offset().top }, speed, "swing");
        })

        // Cache selectors
        var lastId,
            topMenu = $("#menu"),
            // All list items
            menuItems = topMenu.find("a"),
            // Anchors corresponding to menu items
        scrollItems = menuItems.map(function(){
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

        // Bind to scroll
        $(window).scroll(function(){
        // Get container scroll position when 3/4 of div is shown we consider we are in it
        var fromTop = $(this).scrollTop() + ($(window).height() / 4);
        
        // Get id of current scroll item
        var cur = scrollItems.map(function(){
            if ($(this).offset().top < fromTop) {
            return this;
            }
        });
        // Get the id of the current element
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";
        if (lastId !== id) {
            lastId = id;
            menuItems
                .children(".little-btn").removeClass("active");
            menuItems
                .filter("[href='#"+id+"']").children('.little-btn').addClass('active');
        }                   
        });
    },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Oswald');

.full {
  height: 100vh;
  z-index: 1;
  position: relative;
}

#menu {
  position: fixed;
  width: auto;
  height: 100%;
  padding: 0 25px;
  display: table;
  z-index: 100;
  @media (orientation: portrait) {
    width: 100%;
    height: auto;
    text-align: center;
    height: auto;
    padding: 0 0;
  }
}

#menu ul {
  display: table-cell;
  vertical-align: middle;
}

#menu li {
  list-style-type: none;
  text-align: left;
  @media (orientation: portrait) {
    display: inline-block;
    width: 30%;
    height: 100%;
    text-align: center;
  }
}
.menu-text {
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  text-shadow: 0 1px 0px black, 1px 0 0px black, 0 -1px 0px black, -1px 0 0px black, 2px 2px 5px black;
  padding: 5px 10px;
  display: inline-block;
  opacity: 0;
  transition: opacity .5s;
  @media (orientation: portrait) {
    opacity: 1;
    width: 100%;
    margin-top: 0;
    padding: 0;
  }
}

.little-btn {
  width: 12px;
  height: 12px;
  border: 2px solid white;
  display: inline-block;
  margin-left: 10px;
  border-radius: 50%;
  transition: background-color .5s;
  box-shadow: 2px 2px 5px black;
}
.little-btn.active {
  background-color: white;
}
.menu-choice:hover {
  cursor: pointer;
}
.menu-choice:hover .little-btn {
  background-color: rgb(200,200,200);
}

.effect
{
  position: relative;
  margin: 50px auto;
  width: 70%;
  height: 200px;
  background-color: rgba(255,255,255, 1);
  overflow: visible;
  p {
    font-size: 30px;
  }
}
.shadow-effect
{
  z-index: -1;
  position: absolute;
  content: "";
  left: 10px;
  width: calc(100% - 20px);
  height: 100%;
  filter:drop-shadow(0 5px 5px rgba(0,0,0,0.8));
  
  .shape {
    width: 100%;
    height: 100%;
    background: #777;
    -webkit-clip-path: polygon(0 0, 50% 10%, 100% 0, 100% 100%, 50% 90%, 0 100%);
  }
}
</style>
