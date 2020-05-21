import {  findUser,
		getUserByID,
		DeleteCartItem,
		AddCartItem,
		isCartEmpty,
		isEnoughCash,
		WriteOffCash,
		getUser,
		setUser,
		getTotalPrice,
		setTotalPrice,
		getCartProps,
		getAuthorized,
		setAuthorized,
		setCartProps
	  } from './model.js'

import {  renderPropList, 
		renderCartList, 
		ShowCartEmptyLabel, 
		HideCartEmptyLabel, 
		ShowCartInfo,
		HideCartInfo,
		UpdateProfileCashUI,
		MoveToCheck,
		MoveToListing,
		renderCheckList
	  } from './view.js'

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
	let total_price = 0
	getCartProps().forEach(prop => total_price += prop['price'])

	setTotalPrice(total_price)

	cart_price.textContent = `Сумма заказа: $${total_price}`
}

function UpdateCartSize() {
	let cart_size = document.getElementsByClassName('cart-size')[0]
	let cart_prop_count = document.getElementsByClassName('cart-prop-count')[0]
	let size = getCartProps().length

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

function InitBuyBtns() {
	let card_buy_btns = Array.from(document.getElementsByClassName('card-buy-btn'))
	card_buy_btns.forEach((btn, index) => btn.onclick = (() => {
		AddCartItem(index)
		renderCartList()
	}))
}

function CreateOffer() {
	WriteOffCash()

	UpdateProfileCashUI()

	renderCheckList() 
	MoveToCheck()

	setCartProps([])
	renderCartList()
}

function UpdateCheck() {
	UpdateCheckSize()
	UpdateCheckPrice()
}

function UpdateCheckSize() {
	let check_price = document.getElementsByClassName('check-price')[0]
	check_price.textContent = `Сумма заказа: $${getTotalPrice()}`
}

function UpdateCheckPrice() {
	let check_size = document.getElementsByClassName('check-size')[0]
	check_size.textContent = `Всего товаров: ${getCartProps().length}`
}

let header__login = document.getElementsByClassName('header__login')[0]
let header__profile = document.getElementsByClassName('header__profile')[0]

let username_input =  document.getElementsByClassName('login-username')[0]
let password_input =  document.getElementsByClassName('login-password')[0]

let login_btn = document.getElementsByClassName('login-btn')[0]
let unlogin_btn = document.getElementsByClassName('profile__unlogin-btn')[0]

let cart__props = document.getElementsByClassName('cart__props')[0]
let cart_img = document.getElementsByClassName('cart-img')[0] 

let cart_buy_btn = document.getElementsByClassName('cart-buy-btn')[0]

let check_back_btn = document.getElementsByClassName('check__back-btn')[0]


login_btn.onclick = (async () => {
	let userID = await findUser(username_input.value, password_input.value)
	setAuthorized(userID != null)
	if (getAuthorized())
	{
		let user = await getUserByID(userID)
		setUser(user)

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
	setAuthorized(false)
	setUser(null)
	MoveToListing()
	setCartProps([])
	renderCartList()
})

cart_img.onclick = (() => {
	cart__props.classList.toggle('active')
})

cart_buy_btn.onclick = (() => {
	if (getAuthorized()) {
		if (isEnoughCash()) {
			CreateOffer()
			MoveToCheck()
		}
		else alert('Недостаточно средств для оформления заказа')
	}
	else alert('Пожалуйста, авторизуйтесь перед оформелнием заказа')
})

check_back_btn.onclick = (() => {
	MoveToListing()
})

export { UpdateCart, InitBuyBtns, UpdateCheck }