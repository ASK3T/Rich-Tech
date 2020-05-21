import { UpdateCart, InitBuyBtns, UpdateCheck } from './controller.js'
import { getProperties, getCartProps, getUser } from './model.js'

async function renderPropList() {
	let prop_list = document.getElementsByClassName('listing__properties-list')[0]
	let prop_row_html = ''
	let prop_list_html = ''
        
        let properties = await getProperties()

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
        InitBuyBtns()
}

function renderCartList() {
	let prop_list = document.getElementsByClassName('props__list')[0]
	let prop_list_html = ''

	for (let [index, prop] of getCartProps().entries()) {
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

function UpdateProfileCashUI() {
	let profile__cash = document.getElementsByClassName('profile__cash')[0]
	profile__cash.textContent = `$${getUser()['cash']}`
}

function MoveToCheck() {
	CloseListing()
	OpenCheckList()
}

function CloseListing() {
	let listing_section = document.getElementsByClassName('listing')[0]
	listing_section.classList.remove('active')
}

function OpenCheckList() {
	let check_section = document.getElementsByClassName('check')[0]
	check_section.classList.add('active')
}

function MoveToListing() {
	CloseCheckList()
	OpenListing()
}

function CloseCheckList() {
	let check_section = document.getElementsByClassName('check')[0]
	check_section.classList.remove('active')
}

function OpenListing() {
	let listing_section = document.getElementsByClassName('listing')[0]
	listing_section.classList.add('active')
}

function renderCheckList() {
	let check_list = document.getElementsByClassName('check__list')[0]
	let check_list_html = ''

	for (let [index, prop] of getCartProps().entries()) {
		check_list_html +=
		`
		<div class="check__list-item">
			<img src="${prop['img_url']}" class="item-img">
			<div class="item-about">
				<p class="item-title">${prop['title']}</p>
				<p class="item-description">${prop['descr']}</p>
			</div>
			<p class="item-price">$${prop['price']}</p>
		</div>
		` 
	}
	check_list.innerHTML = check_list_html

	UpdateCheck()
}

let cart_buy_btn = document.getElementsByClassName('cart-buy-btn')[0];

(function() {
    renderPropList()
    renderCartList()
})()

export {  renderPropList, 
		renderCartList, 
		ShowCartEmptyLabel, 
		HideCartEmptyLabel, 
		ShowCartInfo,
		HideCartInfo,
		UpdateProfileCashUI,
		MoveToCheck,
		MoveToListing,
		renderCheckList
	  }
