window.addEventListener('load', function () {
  // 倒计时模块
  var date1 = +new Date()
  var date2 = date1 + 1000 * 60 * 60 * 2 + 1000 * 60 * 3 + 5000
  countDown()
  var timer2 = setInterval(countDown, 1000)
  function countDown() {
    date1 = +new Date()
    time_left = (date2 - date1) / 1000
    var h = parseInt(time_left / 60 / 60)
    h = h < 10 ? '0' + h : h
    var min = parseInt((time_left / 60) % 60)
    min = min < 10 ? '0' + min : min
    var s = parseInt(time_left % 60)
    s = s < 10 ? '0' + s : s
    var time_showbox = document.querySelector('.countdown .time')
    var box1 = time_showbox.children[0]
    var box2 = time_showbox.children[1]
    var box3 = time_showbox.children[2]
    box1.innerHTML = h
    box2.innerHTML = min
    box3.innerHTML = s
  }

  // 伪粘性定位模块+楼层显示
  var side_nav = document.querySelector('.sidenav')
  var floor = document.querySelector('.floor')
  document.addEventListener('scroll', function () {
    if (window.pageYOffset >= 184) {
      side_nav.style.position = 'fixed'
      side_nav.style.top = '146px'
    } else {
      side_nav.style.position = 'absolute'
      side_nav.style.top = '330px'
    }
  })
  //楼层显示，取楼层
  var floor_levels = []
  for (i = 0; i < floor.children.length; i++) {
    var level_depth = floor.children[i].offsetTop
    if (!(i % 2)) {
      floor_levels.push(level_depth)
    }
  }
  var side_ul = side_nav.children[0]
  function change_color(i) {
    side_ul.children[i].children[0].style.color = '#fff'
    side_ul.children[i].style.backgroundColor = '#c81623'
    side_ul.children[i].children[0].style.borderBottom = '1px none'
  }
  change_color(0)
  document.addEventListener('scroll', function () {
    for (var i = 0; i < side_ul.children.length; i++) {
      side_ul.children[i].children[0].style.color = '#666'
      side_ul.children[i].style.backgroundColor = ''
    }
    if (window.pageYOffset <= floor_levels[1] - 40) {
      change_color(0)
    } else if (window.pageYOffset <= floor_levels[2] - 40) {
      change_color(1)
    } else {
      change_color(2)
    }
  })

  // 登录模块
  var click_to_login = document.querySelector('#click_to_login')
  var click_to_close = document.querySelector('#closeBtn')
  var login = document.querySelector('#login')
  var login_title = document.querySelector('.login-title')
  var mask = document.querySelector('#bg')
  // 点击登录，弹出登录页面，显示遮罩层
  click_to_login.addEventListener('click', login_box_appear)
  function login_box_appear() {
    login.style.display = 'block'
    mask.style.display = 'block'
  }
  // 点击关闭，关闭登录页面，隐藏遮罩层
  click_to_close.addEventListener('click', login_box_hide)
  function login_box_hide() {
    login.style.display = 'none'
    mask.style.display = 'none'
    login.style.top = '50%'
    login.style.left = '50%'
  }
  // mousedown,mousemove,mouseup
  login_title.addEventListener('mousedown', fn1)
  function fn1(e) {
    var pos_inbox_x = e.pageX - login.offsetLeft
    var pos_inbox_y = e.pageY - login.offsetTop
    // 按下并拖拽才生效
    // mousemove与mouseup必须给document而不是login_title,
    // 不然如果在title外鼠标弹起，停不下来拖拽，同时拖拽太快使鼠标在
    // title外，拖拽不生效
    document.addEventListener('mousemove', fn2)
    function fn2(e) {
      var left_value = e.pageX - pos_inbox_x
      console.log(left_value)
      var top_value = e.pageY - pos_inbox_y
      login.style.left = left_value + 'px'
      login.style.top = top_value + 'px'
    }
    // 注意取消的是mousemove而不是mouseup
    document.addEventListener('mouseup', fn3)
    function fn3(e) {
      document.removeEventListener('mousemove', fn2)
    }
  }

  // 轮播图制作
  // 1. 鼠标经过focus区域(mouseenter),显示侧边按钮，鼠标移开，不显示侧边按钮
  var focus = document.querySelector('.main .focus')
  var side_btn_left = focus.querySelector('.side_btn_left')
  var side_btn_right = focus.querySelector('.side_btn_right')
  var focus_all = focus.querySelector('ul')
  var circle_container = focus.querySelector('ol')
  var focus_width = focus.offsetWidth
  var current_number = null
  var focus_copy = focus_all.children[0].cloneNode(true)
  focus_all.appendChild(focus_copy)
  var timer1 = null

  focus.addEventListener('mouseenter', function () {
    side_btn_left.style.display = 'block'
    side_btn_right.style.display = 'block'
    // 计时器停止
    clearInterval(timer1)
  })

  focus.addEventListener('mouseleave', function () {
    side_btn_left.style.display = 'none'
    side_btn_right.style.display = 'none'
    // 计时器开始
    timer1 = setInterval(function () {
      side_btn_right.click()
    }, 3200)
  })
  // 2. 利用循环动态生成小圆圈
  for (i = 0; i < focus_all.children.length - 1; i++) {
    var circle = document.createElement('li')
    circle_container.appendChild(circle)
    // 为小圆圈生成一个索引
    circle.setAttribute('data-index', i)

    // 点击小圆圈，变色
    circle_container.children[i].addEventListener('click', function () {
      for (i = 0; i < focus_all.children.length - 1; i++) {
        circle_container.children[i].className = ''
      }
      this.className = 'current'
      // 变色同时切换图片(动画，focus_all应有定位)
      current_number = this.getAttribute('data-index')
      animate(focus_all, -current_number * focus_width)
      console.log(current_number)
    })
  }
  circle_container.children[0].className = 'current'
  // 3. 如果点击小圆圈，小圆圈就会添加current类
  // 4. 点击小圆圈，图片切换到对应图片
  // 5. 深克隆第一张图片
  // 深克隆应放在最前面以免先前根据图片个数产生的圆圈数量不一致
  // 6. 点击side_btn, 实现图片切换功能，并应与点击小圆圈协调
  // 8. 设置节流阀,有了节流阀不用担心点击过快导致current_number在animate没有结束之前
  // 就增加多次，以至于大于图片个数无缝跳转来不及生效的问题
  var flag = true

  side_btn_right.addEventListener('click', function () {
    if (flag) {
      flag = false
      // 注意current_number += 1会变成字符串相加，还是用++比较安全
      current_number++
      // 点击完侧边按钮应该反映在小圆圈里,不写成animate的callback函数可以实现
      // 先换小圆点后换图片，但是写起来麻烦，要多加一次条件判定，写在animate
      // 里面可以先改current_number
      for (i = 0; i < focus_all.children.length - 1; i++) {
        circle_container.children[i].className = ''
      }
      if (current_number === focus_all.children.length - 1) {
        circle_container.children[0].className = 'current'
      } else {
        circle_container.children[current_number].className = 'current'
      }

      animate(focus_all, -current_number * focus_width, function () {
        if (current_number === focus_all.children.length - 1) {
          focus_all.style.left = 0 + 'px'
          current_number = 0
        }
        flag = true
      })
    }
  })

  // 同样给左边按钮,不用重新声明节流阀
  side_btn_left.addEventListener('click', function () {
    if (flag) {
      flag = false
      // 注意current_number += 1会变成字符串相加，还是用++比较安全
      current_number--

      // 点击完侧边按钮应该反映在小圆圈里,不写成animate的callback函数可以实现
      // 先换小圆点后换图片，但是写起来麻烦，要多加一次条件判定，写在animate
      // 里面可以先改current_number
      for (i = 0; i < focus_all.children.length - 1; i++) {
        circle_container.children[i].className = ''
      }
      if (current_number === -1) {
        focus_all.style.left = -(focus_all.children.length - 1) * focus_width + 'px'
        current_number = circle_container.children.length - 1
        circle_container.children[current_number].className = 'current'
      } else {
        circle_container.children[current_number].className = 'current'
      }

      animate(focus_all, -current_number * focus_width, function () {
        flag = true
      })
    }
  })
  // 7. 添加一个定时器，每过一段时间模拟一次点击右侧按钮事件，鼠标经过，计时器停止。鼠标移开，计时器继续。
  // 在mouseenter,mouseleave生效之前先调用一次，声明在一开始
  timer1 = setInterval(function () {
    side_btn_right.click()
  }, 3200)
})
