//document.height = 0;

function Menu(mlayer) {
  const menus = [
    'src_Menu',
    'club_Menu',
    'photos_Menu',
    'games_Menu',
    'gb_Menu',
  ]
  menus.forEach((menu) => {
    document.getElementById(menu).style.visibility = 'hidden'
  })
  document.getElementById(mlayer).style.visibility = 'visible'
}

function MenuC(mlayer) {
  document.getElementById(mlayer).style.visibility = 'hidden'
}

function new_win(theURL, features) {
  window.open(theURL, '', features)
}

function MenuCloseAll() {
  const menus = [
    'src_Menu',
    'club_Menu',
    'photos_Menu',
    'games_Menu',
    'gb_Menu',
  ]
  menus.forEach((menu) => {
    document.getElementById(menu).style.visibility = 'hidden'
  })
}
