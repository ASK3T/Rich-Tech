let users, properties

let cart_props = []

let user = null
let isAuthorized = false
let total_price = 0

async function getProperties() {
    const responce = await fetch('./js/properties_data.json')
    properties = await responce.json()
    return properties
}

async function getUsers () {
  const response = await fetch('./js/users_data.json')
  users = await response.json()
  return users
}

properties = (async() => await getProperties())()
users = (async() => await getUsers())()

function findUser(username, password) {
	for (let user of users)
            if (username == user['username'] && password == user['pass'])
		return user['id']
	return null
}

function getUserByID(userID) {
	for (let user of users)
		if (userID == user['id'])
			return user
}

function DeleteCartItem(index) {
	cart_props.splice(index, 1)
}

function AddCartItem(index) {
	cart_props.push(properties[index])
}

function isCartEmpty() {
	return cart_props.length == 0
}

function isEnoughCash() {
	return user['cash'] >= total_price
}

function WriteOffCash() {
	user['cash'] -= total_price
}

function getUser() {
	return user
}

function setUser(new_user) {
	user = new_user
}

function getTotalPrice() {
	return total_price
}

function setTotalPrice(price) {
	total_price = price
}

function getCartProps() {
	return cart_props
}

function getAuthorized() {
	return isAuthorized
}

function setAuthorized(bool) {
	isAuthorized = bool
}

function setCartProps(props) {
	cart_props = props
}

export {  findUser,
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
		setCartProps,
                getProperties
	  }