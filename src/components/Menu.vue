<template>
  <div id="menu">
    <ul>
      <li>
        <a class="menu-choice" href="#main">
          <div class="little-btn active"></div><span class="menu-text">À propos</span>
        </a>
      </li>
      <li>
        <a class="menu-choice" href="#achievments">
          <div class="little-btn"></div><span class="menu-text">Expériences</span>
        </a>
      </li>
      <li>
        <a class="menu-choice" href="#skills">
          <div class="little-btn"></div><span class="menu-text">Compétences</span>
        </a>
      </li>
      <li>
        <a class="menu-choice" href="#about">
          <div class="little-btn"></div><span class="menu-text">Loisirs</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  props: {
    title: Array,
    divs: Array,
  },
  methods: {
    bindHover() {
      const $choices = $('.menu-choice')
      $choices.off('mouseenter.menuHover mouseleave.menuHover')
      if (window.innerWidth > window.innerHeight) {
        $choices.on('mouseenter.menuHover', () => {
          $('.menu-text').css({ opacity: 1 })
        })
        $choices.on('mouseleave.menuHover', () => {
          $('.menu-text').css({ opacity: 0 })
        })
      }
    },
    onResize() {
      this.bindHover()
    },
  },
  mounted() {
    this.bindHover()
    $(window).on('resize.menu', this.onResize)

    $('.menu-choice').on('click.menu', function (e) {
      e.preventDefault()
      $('.little-btn').removeClass('active')
      $(this).children('.little-btn').addClass('active')
      const div = $($(this).attr('href'))
      const speed = 0
      const target = div.children().first().offset()
      if (target) {
        $('html, body').animate({ scrollTop: target.top }, speed, 'swing')
      }
    })

    let lastId
    const topMenu = $('#menu')
    const menuItems = topMenu.find('a')
    const scrollItems = menuItems.map(function () {
      const item = $($(this).attr('href'))
      if (item.length) {
        return item
      }
    })

    $(window).on('scroll.menu', function () {
      const fromTop = $(this).scrollTop() + $(window).height() / 4

      let cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop) {
          return this
        }
      })
      cur = cur[cur.length - 1]
      const id = cur && cur.length ? cur[0].id : ''
      if (lastId !== id) {
        lastId = id
        menuItems.children('.little-btn').removeClass('active')
        menuItems.filter("[href='#" + id + "']").children('.little-btn').addClass('active')
      }
    })
  },
  beforeUnmount() {
    $(window).off('.menu')
    $('.menu-choice').off('.menu .menuHover')
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
    width: 20%;
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
  transition: opacity 0.5s;
  @media (orientation: portrait) {
    opacity: 0;
    width: 100%;
    margin-top: 0;
    padding: 0;
    font-size: 12px;
  }
}

.little-btn {
  width: 12px;
  height: 12px;
  border: 2px solid white;
  display: inline-block;
  margin-left: 10px;
  border-radius: 50%;
  transition: background-color 0.5s;
  box-shadow: 2px 2px 5px black;
}

.little-btn.active {
  background-color: white;
}

.menu-choice:hover {
  cursor: pointer;
}

.menu-choice:hover .little-btn {
  background-color: rgb(200, 200, 200);
}
</style>
