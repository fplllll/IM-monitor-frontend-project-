<template>
  <canvas ref="demoCanvas"/>
</template>

<script>
import { TweenLite, Ease } from 'gsap'
// import * as EasePack from './EasePack.min'
export default {
  name: 'Background',
  data() {
    return {
      width: true,
      height: true,
      largeHeader: true,
      canvas: true,
      ctx: true,
      points: true,
      target: true,
      animateHeader: true
    }
  },
  mounted() {
    this.initHeader()
    this.initAnimation()
    this.addListeners()
  },
  methods: {
    initHeader() {
      this.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      this.target = { x: this.width / 2, y: this.height / 2 }

      // this.largeHeader = document.getElementById('large-header')
      // this.largeHeader.style.height = this.height + 'px'

      this.canvas = this.$refs.demoCanvas

      this.canvas.width = this.width
      this.canvas.height = this.height
      this.ctx = this.canvas.getContext('2d')
      // create points
      this.points = []
      for (var x = 0; x < this.width; x = x + this.width / 20) {
        for (var y = 0; y < this.height; y = y + this.height / 20) {
          var px = x + Math.random() * this.width / 20
          var py = y + Math.random() * this.height / 20
          var p = { x: px, originX: px, y: py, originY: py }
          this.points.push(p)
        }
      }

      // for each point find the 5 closest points
      for (var i = 0; i < this.points.length; i++) {
        var closest = []
        var p1 = this.points[i]
        for (var j = 0; j < this.points.length; j++) {
          var p2 = this.points[j]
          if (!(p1 === p2)) {
            var placed = false
            for (var k = 0; k < 5; k++) {
              if (!placed) {
                if (closest[k] === undefined) {
                  closest[k] = p2
                  placed = true
                }
              }
            }

            for (var h = 0; h < 5; h++) {
              if (!placed) {
                if (this.getDistance(p1, p2) < this.getDistance(p1, closest[h])) {
                  closest[h] = p2
                  placed = true
                }
              }
            }
          }
        }
        p1.closest = closest
      }

      // assign a circle to each point
      for (var g in this.points) {
        var c = new this.Circle(this.points[g], 2 + Math.random() * 2, 'rgba(226,226,226,0.8)', this.ctx)
        this.points[g].circle = c
      }
    },
    addListeners() {
      if (!('ontouchstart' in window)) {
        window.addEventListener('mousemove', this.mouseMove)
      }
      window.addEventListener('scroll', this.scrollCheck)
      window.addEventListener('resize', this.resize)
    },

    mouseMove(e) {
      var posx = 0
      var posy = 0
      if (e.pageX || e.pageY) {
        posx = e.pageX
        posy = e.pageY
      } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
      }
      this.target.x = posx
      this.target.y = posy
    },

    scrollCheck() {
      if (document.body.scrollTop > this.height) {
        this.animateHeader = false
      } else {
        this.animateHeader = true
      }
    },

    resize() {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.largeHeader.style.height = this.height + 'px'
      this.canvas.width = this.width
      this.canvas.height = this.height
    },

    // animation
    initAnimation() {
      this.animate()
      for (var i in this.points) {
        this.shiftPoint(this.points[i])
      }
    },

    animate() {
      if (this.animateHeader) {
        this.ctx.clearRect(0, 0, this.width, this.height)
        for (var i in this.points) {
          // detect points in range
          if (Math.abs(this.getDistance(this.target, this.points[i])) < 4000) {
            this.points[i].active = 0.3
            this.points[i].circle.active = 0.6
          } else if (Math.abs(this.getDistance(this.target, this.points[i])) < 20000) {
            this.points[i].active = 0.1
            this.points[i].circle.active = 0.3
          } else if (Math.abs(this.getDistance(this.target, this.points[i])) < 40000) {
            this.points[i].active = 0.02
            this.points[i].circle.active = 0.1
          } else {
            this.points[i].active = 0
            this.points[i].circle.active = 0
          }

          this.drawLines(this.points[i])
          this.points[i].circle.draw()
        }
      }
      requestAnimationFrame(this.animate)
    },

    shiftPoint(p) {
      var that = this
      TweenLite.to(p, 1 + 1 * Math.random(), {
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: Ease.easeInOut,
        onComplete: function() {
          that.shiftPoint(p)
        }
      })
    },

    // Canvas manipulation
    drawLines(p) {
      if (!p.active) return
      for (var i in p.closest) {
        this.ctx.beginPath()
        this.ctx.moveTo(p.x, p.y)
        this.ctx.lineTo(p.closest[i].x, p.closest[i].y)
        this.ctx.strokeStyle = 'rgba(226,226,226,' + p.active + ')'
        this.ctx.stroke()
      }
    },

    Circle(pos, rad, color, ctx) {
      var _this = this;

      // constructor
      (function() {
        _this.pos = pos || null
        _this.radius = rad || null
        _this.color = color || null
      })()

      this.draw = function() {
        if (!_this.active) return
        ctx.beginPath()
        ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false)
        ctx.fillStyle = 'rgba(225,225,225,' + _this.active + ')'
        ctx.fill()
      }
    },

    // Util
    getDistance(p1, p2) {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
    }
  }
}
</script>

<style scoped>

</style>
