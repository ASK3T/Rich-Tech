let cart_props = []

let properties = [
	{
		'id': 0,
		'title': '17.3" Ноутбук Lenovo Ideapad L340-17IRH черный',
		'descr': '[1920x1080, IPS, Intel Core i5 9300H, 4 х 2.4 ГГц, RAM 16 ГБ, HDD 1000 ГБ, SSD 256 ГБ, GeForce GTX 1650 4 Гб, Wi-Fi, BT, Windows 10 Home]',
		'img_url': 'img/property_0.jpg',
		'price': 2499
	},
	{
		'id': 1,
		'title': '17.3" Ноутбук Acer Predator Helios 300 PH317-53-52CM черный',
		'descr': '[1920x1080, IPS, Intel Core i5 9300H, 4 х 2.4 ГГц, RAM 8 ГБ, SSD 512 ГБ, GeForce GTX 1660 Ti 6 Гб, Wi-Fi, Windows 10 Home]',
		'img_url': 'img/property_1.jpg',
		'price': 2699
	},
	{
		'id': 2,
		'title': '13.9" Ультрабук ASUS ZenBook UX392FA-AB016T голубой',
		'descr': '[1920x1080, IPS, Intel Core i7 8565U, 4 х 1.8 ГГц, RAM 8 ГБ, SSD 512 ГБ, Intel UHD Graphics 620 , Wi-Fi, Windows 10 Home]',
		'img_url': 'img/property_2.jpg',
		'price': 2799
	},
	{
		'id': 3,
		'title': '15.6" Ноутбук Acer Predator Helios 300 PH315-52-55FN черный',
		'descr': '[1920x1080, IPS, Intel Core i5 9300H, 4 х 2.4 ГГц, RAM 8 ГБ, SSD 512 ГБ, GeForce GTX 1660 Ti 6 Гб, Wi-Fi, UNIX-подобная]',
		'img_url': 'img/property_3.jpg',
		'price': 2999
	},
	{
		'id': 4,
		'title': '15.6" Ультрабук Lenovo Yoga C740-15IML серый',
		'descr': '[1920x1080, IPS, Intel Core i7 10510U, 4 х 1.8 ГГц, RAM 16 ГБ, SSD 512 ГБ, Intel UHD Graphics 620 , Wi-Fi, Windows 10 Home]',
		'img_url': 'img/property_4.jpg',
		'price': 3099
	},
	{
		'id': 5,
		'title': '17.3" Ноутбук HP OMEN 17-cb0050ur черный',
		'descr': '[1920x1080, IPS, Intel Core i7 9750H, 6 х 2.6 ГГц, RAM 16 ГБ, SSD 512 ГБ, GeForce GTX 1660 Ti 6 Гб, Wi-Fi, DOS]',
		'img_url': 'img/property_5.jpg',
		'price': 3299
	},
]

let users = [
	{
		'id': 0,
		'username': 'test',
		'pass': '111',
		'img_url': 'img/avatar1.png',
		'realname': 'Евгений',
		'cash': 4000
	},
	{
		'id': 1,
		'username': 'foo',
		'pass': 'buzz',
		'img_url': 'img/avatar2.png',
		'realname': 'Юрий',
		'cash': 8000
	}
]


function findUser(username, password) {
	for (let user of users)
			if (username == user['username'] && password == user['pass'])
				return user['id']
	return null
}

function getUser(userID) {
	for (let user of users)
		if (userID == user['id'])
			return user
}

function renderPropList() {
	let prop_list = document.getElementsByClassName('listing__properties-list')[0]
	let prop_row_html = ''
	let prop_list_html = ''

	for (let [index, prop] of properties.entries()) {
		prop_row_html +=
		`
		<div class="col-4">
			<div class="properties-list__card">
					<img src="${prop['img_url']}" class="card-img">
					<div class="property-details">
						<h3 class="card-label">${prop['title']}</h3>
						<p class="card-description">${prop['descr']}</p>
						<div class="d-flex justify-content-between">
							<p class="card-price">$${prop['price']}</p>
							<button class="card-buy-btn black-btn btn">Купить</button>
						</div>
				</div>
			</div>
		</div>
		` 

		if (index % 3 == 2) {
			prop_row_html = `<div class="row">${prop_row_html}</div>`
			prop_list_html += prop_row_html
			prop_row_html = ''
		}
	}

	prop_list.innerHTML = 
	`
	<div class="container">
		${prop_list_html}
	</div>
	`
}

function renderCartList() {
	let prop_list = document.getElementsByClassName('props__list')[0]
	let prop_list_html = ''

	for (let [index, prop] of cart_props.entries()) {
		prop_list_html +=
		`
		<div class="props__list-item">
			<img src="${prop['img_url']}" class="item-img">
			<div class="item-about">
				<p class="item-title">${prop['title']}</p>
				<p class="item-description">${prop['descr']}</p>
			</div>
			<div class="d-flex flex-column">
				<p class="item-price">$${prop['price']}</p>
				<button class="item-remove-btn black-btn btn">X</button>
			</div>
		</div>
		` 
	}
	prop_list.innerHTML = prop_list_html

	UpdateCart()
}

function UpdateCart() {
	if (isCartEmpty()) {
		HideCartInfo()
		ShowCartEmptyLabel()
	}
	else {
		ShowCartInfo()
		HideCartEmptyLabel()

		UpdateCartPrice()
		UpdateDeleteBtns()
	}
	UpdateCartSize()
}

function UpdateCartPrice() {
	let cart_price = document.getElementsByClassName('cart-price')[0]
	total_price = 0
	cart_props.forEach(prop => total_price += prop['price'])

	cart_price.textContent = `Сумма заказа: $${total_price}`
}

function UpdateCartSize() {
	let cart_size = document.getElementsByClassName('cart-size')[0]
	let cart_prop_count = document.getElementsByClassName('cart-prop-count')[0]
	let size = cart_props.length

	cart_size.textContent = `Всего товаров: ${size}`
	cart_prop_count.textContent = `${size}`
}

function UpdateDeleteBtns() {
	let delete_btns = Array.from(document.getElementsByClassName('item-remove-btn'))

	delete_btns.forEach((btn, index) =>
	{
		btn.removeAttribute('onclick')
		btn.onclick = (() => {
			DeleteCartItem(index)
			renderCartList()
		})
	})
}

function DeleteCartItem(index) {
	cart_props.splice(index, 1)
}

function InitBuyBtns() {
	let card_buy_btns = Array.from(document.getElementsByClassName('card-buy-btn'))
	card_buy_btns.forEach((btn, index) => btn.onclick = (() => {
		AddCartItem(index)
		renderCartList()
	}))
}

function AddCartItem(index) {
	cart_props.push(properties[index])
}

function isCartEmpty() {
	return cart_props.length == 0
}

function ShowCartEmptyLabel() {
	let cart_empty_label = document.getElementsByClassName('cart-empty-label')[0]
	cart_empty_label.classList.add('active')
}

function HideCartEmptyLabel() {
	let cart_empty_label = document.getElementsByClassName('cart-empty-label')[0]
	cart_empty_label.classList.remove('active')
}

function ShowCartInfo() {
	let cart_label = document.getElementsByClassName('cart-label')[0] 
	let cart_size = document.getElementsByClassName('cart-size')[0] 
	let cart_price = document.getElementsByClassName('cart-price')[0] 
	let cart_buy_btn = document.getElementsByClassName('cart-buy-btn')[0]

	cart_label.classList.add('active')
	cart_size.classList.add('active')
	cart_price.classList.add('active')
	cart_buy_btn.classList.add('active')
}

function HideCartInfo() {
	let cart_label = document.getElementsByClassName('cart-label')[0] 
	let cart_size = document.getElementsByClassName('cart-size')[0] 
	let cart_price = document.getElementsByClassName('cart-price')[0] 
	let cart_buy_btn = document.getElementsByClassName('cart-buy-btn')[0]

	cart_label.classList.remove('active')
	cart_size.classList.remove('active')
	cart_price.classList.remove('active')
	cart_buy_btn.classList.remove('active')
}

function isEnoughCash() {
	return user['cash'] >= total_price
}

function CreateOffer() {
	user['cash'] -= total_price
	UpdateProfileCashUI()
	//вывод чека
	cart_props = []
	renderCartList()
}

function UpdateProfileCashUI() {
	let profile__cash = document.getElementsByClassName('profile__cash')[0]
	profile__cash.textContent = `$${user['cash']}`
}


let user = null
let isAuthorized = false
let total_price = 0

let header__login = document.getElementsByClassName('header__login')[0]
let header__profile = document.getElementsByClassName('header__profile')[0]

let username_input =  document.getElementsByClassName('login-username')[0]
let password_input =  document.getElementsByClassName('login-password')[0]

let login_btn = document.getElementsByClassName('login-btn')[0]
let unlogin_btn = document.getElementsByClassName('profile__unlogin-btn')[0]

let cart__props = document.getElementsByClassName('cart__props')[0]
let cart_img = document.getElementsByClassName('cart-img')[0] 

let cart_buy_btn = document.getElementsByClassName('cart-buy-btn')[0]


login_btn.onclick = (() => {
	let userID = findUser(username_input.value, password_input.value)
	isAuthorized = userID != null
	if (isAuthorized)
	{
		user = getUser(userID)

		let profile__img = document.getElementsByClassName('profile__img')[0]
		let profile__name = document.getElementsByClassName('profile__name')[0]
		let profile__cash = document.getElementsByClassName('profile__cash')[0]

		profile__img.src = user['img_url']
		profile__name.textContent = user['realname']
		profile__cash.textContent = `$${user['cash']}`

		header__login.classList.remove('active')
		header__profile.classList.add('active')
	}
	else {
		alert('Неверный логин или пароль')
	}

	username_input.value = ''
	password_input.value = ''
})

unlogin_btn.onclick = (() => {
	header__login.classList.add('active')
	header__profile.classList.remove('active')
	isAuthorized = false
	user = null
	cart_props = []
	renderCartList()
})

cart_img.onclick = (() => {
	cart__props.classList.toggle('active')
})

cart_buy_btn.onclick = (() => {
	if (isAuthorized) {
		if (isEnoughCash()) {
			CreateOffer()
		}
		else alert('Недостаточно средств для оформления заказа')
	}
	else alert('Пожалуйста, авторизуйтесь перед оформелнием заказа')
})

renderPropList()
renderCartList()
InitBuyBtns()