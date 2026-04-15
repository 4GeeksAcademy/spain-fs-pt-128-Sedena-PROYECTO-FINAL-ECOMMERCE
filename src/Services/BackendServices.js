const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ---------------------
// SHIRTS
// ---------------------

export const getShirts = async () => {
	const response = await fetch(`${BACKEND_URL}/api/shirts`);

	const data = await response.json();

	if (!response.ok) {
		return { error: true, data };
	}

	return data;
};

export const getShirtById = async (shirtId) => {
	const response = await fetch(`${BACKEND_URL}/api/shirts/${shirtId}`);

	const data = await response.json();

	if (!response.ok) {
		return { error: true, data };
	}

	return data;
};

// ---------------------
// USER
// ---------------------

export const registerUser = async (user) => {
	const response = await fetch(`${BACKEND_URL}/api/users`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});

	const data = await response.json();

	if (!response.ok) {
		return { error: true, data };
	}

	return data;
};

export const getUserById = async (userId) => {
	const response = await fetch(`${BACKEND_URL}/api/users/${userId}`);

	const data = await response.json();

	if (!response.ok) {
		return { error: true, data };
	}

	return data;
};

export const updateUser = async (userId, userData) => {
	const response = await fetch(`${BACKEND_URL}/api/users/${userId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});

	const data = await response.json();

	if (!response.ok) {
		return { error: true, data };
	}

	return data;
};

export const deleteUser = async (userId) => {
	const response = await fetch(`${BACKEND_URL}/api/users/${userId}`, {
		method: "DELETE",
	});

	const data = await response.json();

	if (!response.ok) {
		return { error: true, data };
	}

	return data;
};

// ---------------------
// LOGIN
// ---------------------

export const loginUser = async (user) => {
	const response = await fetch(`${BACKEND_URL}/api/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});

	const data = await response.json();

	if (!response.ok) {
		return { error: true, data };
	}

	return data;
};



// ---------------------
// CART
// ---------------------

export const getCartByUserId = async (userId) => {
	const response = await fetch(`${BACKEND_URL}/api/cart/${userId}`);

	const data = await response.json();

	if (!response.ok) {
		return { error: true, data };
	}

	return data;
};

export const addToCart = async (cartItem) => {
	const response = await fetch(`${BACKEND_URL}/api/cart/items`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(cartItem),
	});

	const data = await response.json();

	if (!response.ok) {
		return { error: true, data };
	}

	return data;
};

export const updateCartItem = async (itemId, quantityData) => {
	const response = await fetch(`${BACKEND_URL}/api/cart/items/${itemId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(quantityData),
	});

	const data = await response.json();

	if (!response.ok) {
		return { error: true, data };
	}

	return data;
};

export const deleteCartItem = async (itemId) => {
	const response = await fetch(`${BACKEND_URL}/api/cart/items/${itemId}`, {
		method: "DELETE",
	});

	const data = await response.json();

	if (!response.ok) {
		return { error: true, data };
	}

	return data;
};