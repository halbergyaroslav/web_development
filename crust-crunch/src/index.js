/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // Обработчик прокрутки для навигации
  window.addEventListener('scroll', () => {
    let currentSection = "";
    sections.forEach(section => {
      const rect = section.getBoundingClientRect(); 
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      // Проверяем, если секция на экране
      if (sectionTop <= window.innerHeight / 2 && sectionBottom >= window.innerHeight / 2) {
        currentSection = section.getAttribute('id');
      }
    });
    // Подсветка активной секции в навбаре
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === currentSection) {
        link.classList.add('active');
      }
    });
  });

  // Обработчик клика по ссылке на навбаре
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); 
      const targetId = link.getAttribute('href').substring(1); 
      const targetSection = document.getElementById(targetId); 
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Загрузка данных из файла pizzas.json
  fetch('pizzas.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      const hitzzData = data.hitzz;
      const pizzasData = data.pizzas;
      const beveragesData = data.beverages;

      const cardsRowHitzz = document.getElementById('cards-row-hitzz');
      const cardsRowPizzas = document.getElementById('cards-row-pizzas');
      const cardsRowBeverages = document.getElementById('cards-row-beverages');

      // Генерация карточек для секции hitzz
      hitzzData.forEach(item => {
        const card = `
          <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="card card-custom" style="width: 100%; background-color: #f9f9f9;" data-bs-toggle="modal" data-bs-target="#exampleModal" data-name="${item.name}" data-description="${item.description}" data-price="${item.price}" data-img="${item.src}" data-section="hitzz">
              <img src="${item.src}" class="card-img-top" alt="${item.name}" />
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
              </div>
              <div class="card-footer d-flex justify-content-between align-items-center">
                <span>from ${item.price}$</span>
                <a href="#" class="btn btn-warning btn-rounded">Order</a>
              </div>
            </div>
          </div>
        `;
        cardsRowHitzz.innerHTML += card;
      });

      // Генерация карточек для секции pizzas
      pizzasData.forEach(item => {
        const card = `
          <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="card card-custom" style="width: 100%; background-color: #f9f9f9;" data-bs-toggle="modal" data-bs-target="#exampleModal" data-name="${item.name}" data-description="${item.description}" data-price="${item.price}" data-img="${item.src}" data-section="pizzas">
              <img src="${item.src}" class="card-img-top" alt="${item.name}" />
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
              </div>
              <div class="card-footer d-flex justify-content-between align-items-center">
                <span>from ${item.price}$</span>
                <a href="#" class="btn btn-warning btn-rounded">Order</a>
              </div>
            </div>
          </div>
        `;
        cardsRowPizzas.innerHTML += card;
      });

      // Генерация карточек для секции beverages
      beveragesData.forEach(item => {
        const card = `
          <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="card card-custom" style="width: 100%; background-color: #f9f9f9;" data-bs-toggle="modal" data-bs-target="#exampleModal" data-name="${item.name}" data-description="${item.description}" data-price="${item.price}" data-img="${item.src}" data-section="beverages">
              <img src="${item.src}" class="card-img-top" alt="${item.name}" />
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
              </div>
              <div class="card-footer d-flex justify-content-between align-items-center">
                <span>from ${item.price}$</span>
                <a href="#" class="btn btn-warning btn-rounded">Order</a>
              </div>
            </div>
          </div>
        `;
        cardsRowBeverages.innerHTML += card;
      });
    })
    .catch(error => {
      console.error('Error loading JSON:', error);
    });
    
const modalToppings = document.getElementById('modal-toppings');
const orderButton = document.getElementById('order-btn');
let basePrice = 0;
let totalPrice = 0;
const selectedToppings = new Set(); 

// Обработчик кликов по контейнеру с топпингами
modalToppings.addEventListener('click', function (event) {
  const clickedCard = event.target.closest('.card'); 

  if (clickedCard) {
    const toppingName = clickedCard.getAttribute('data-name'); 
    const toppingPrice = parseFloat(clickedCard.getAttribute('data-price'));

    if (clickedCard.classList.contains('active')) {
      // Если топпинг активный, снимаем активность и вычитаем из общей цены
      clickedCard.classList.remove('active');
      selectedToppings.delete(toppingName); 
      totalPrice -= toppingPrice;
    } 
    else {
      // Если топпинг не активный, добавляем активность и добавляем к общей цене
      clickedCard.classList.add('active');
      selectedToppings.add(toppingName); 
      totalPrice += toppingPrice;
    }
    updateOrderButton(); 
  }
});

// Функция обновления текста в кнопке заказа
function updateOrderButton() {
  orderButton.textContent = `Order Now - ${totalPrice.toFixed(2)}$`;
}

orderButton.addEventListener('click', () => {
  // Получаем данные для заказа
  const pizzaName = document.getElementById('modal-item-name').textContent;
  const pizzaDescription = document.getElementById('modal-item-description').textContent;
  const imageSrc = document.getElementById('modal-item-img').src;

  const activeToppings = Array.from(document.querySelectorAll('#modal-toppings .card.active'))
    .map(card => card.querySelector('.card-title').textContent);

  // Формируем данные для отправки
  const orderData = {
    pizza: pizzaName,
    description: pizzaDescription, 
    src: imageSrc,
    details: [...activeToppings],
    price: totalPrice,
    status: 'prepared',
  };

  // Отправляем данные на сервер
  fetch('http://localhost:5000/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error creating order:', error);
    });
});

// Обработчик открытия модального окна
const modal = document.getElementById('exampleModal');
modal.addEventListener('show.bs.modal', function (event) {
  const card = event.relatedTarget.closest('.card-custom');  
  const name = card.getAttribute('data-name');
  const description = card.getAttribute('data-description');
  basePrice = parseFloat(card.getAttribute('data-price')); 
  const imgSrc = card.getAttribute('data-img');
  const section = card.getAttribute('data-section');

  document.getElementById('modal-item-name').textContent = name;
  document.getElementById('modal-item-description').textContent = description;
  document.getElementById('modal-item-img').src = imgSrc;

  totalPrice = basePrice;
  selectedToppings.clear();
  updateOrderButton();

  // Загружаем топпинги и добавляем их в модальное окно
  fetch('pizzas.json')
    .then(response => response.json())
    .then(data => {
      let toppingsData = [];
     
      if (section === 'hitzz' || section === 'pizzas') {
        toppingsData = data.toppingspizza;
      } 
      else if (section === 'beverages') {
        toppingsData = data.toppingsbeverages;
      }
      const toppingsContainer = document.getElementById('modal-toppings');
      toppingsContainer.innerHTML = '';
      
      // Генерация карточек для топпингов
      toppingsData.forEach(topping => {
        const toppingCard = `
          <div class="col-6 col-md-4">
            <div class="card" data-name="${topping.name}" data-price="${topping.price}" data-img="${topping.src}">
              <img src="${topping.src}" class="card-img-top" alt="${topping.name}">
              <div class="card-body">
                <h5 class="card-title text-center">${topping.name}</h5>
                <p class="card-text text-center">${topping.price}$</p>
              </div>
            </div>
          </div>
        `;
        toppingsContainer.innerHTML += toppingCard;
      });
    })
    .catch(error => {
      console.error('Error loading toppings:', error);
    });
});

// Функция для загрузки данных из файла orders.json
const checkOrders = () => {
  fetch('orders.json')
    .then(response => response.json())
    .then(data => {
      const preparedOrders = data.orders.filter(order => order.status === 'prepared');

      // Если есть хотя бы один заказ, меняем картинку на заполненную корзину
      const cartIcon = document.getElementById('cart-icon');
      console.log(preparedOrders);
      if (preparedOrders.length > 0) {
        cartIcon.src = './filled_korzina.png'; 
      } else {
        cartIcon.src = './korzina.png'; 
      }
    })
    .catch(error => {
      console.error('Error loading orders:', error);
    });
};

document.getElementById('cart-button').addEventListener('click', function() {
  // Открытие модального окна
  const orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
  orderModal.show();

  // Загружаем данные из orders.json
  fetch('orders.json')
    .then(response => response.json())
    .then(data => {
      const orders = data.orders.filter(order => order.status === 'prepared');
      const orderCardsContainer = document.getElementById('order-cards-container');
    
      orderCardsContainer.innerHTML = '';

      // Генерация карточек для каждого заказа
      orders.forEach(order => {
        const card = document.createElement('div');
        card.classList.add('col-md-12', 'mb-3'); 
        
        card.innerHTML = `
          <div class="card d-flex flex-row" style="width: 100%; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px;">
            <img src="${order.src}" class="card-img-left" alt="${order.pizza}" style="width: 200px; height: 200px; object-fit: cover; border-right: 1px solid #ddd;">
            <div class="card-body d-flex flex-column justify-content-between">
              <h5 class="card-title">${order.pizza}</h5>
              <p class="card-text"><strong>Description:</strong> ${order.description}</p>
              <div class="d-flex flex-wrap" style="margin-top:-35px;margin-left:-7px;">
                ${order.details.map(topping => `
                  <div class="topping-card" style="background-color: transparent; padding: 5px 15px; margin: 5px; border: 1px solid black; border-radius: 5px; font-size: 0.9rem;">
                    ${topping}
                  </div>
                `).join('')}
              </div>
              <p class="card-text" style="margin-top:5px;"><strong>Total: $${order.price.toFixed(2)}</strong></p>
              <button class="btn-close-card" data-order-id="${order.id}" style="background: none; border: none; font-size: 1.5rem; color: #000; cursor: pointer; position: absolute; top: 10px; right: 10px;">
            &times;
            </button>        
            </div>
            </div>
        `;
        orderCardsContainer.appendChild(card);
      });

      const totalAmount = orders.reduce((sum, order) => sum + order.price, 0);
      const orderButton2 = document.getElementById('order-btn-2');
      updateOrderButton2();

      function updateOrderButton2() {
          orderButton2.textContent = `Order Now - ${totalAmount.toFixed(2)}$`;
        }
      orderCardsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-close-card')) {
          const orderId = event.target.getAttribute('data-order-id');
          
          fetch(`http://localhost:5000/api/orders/${orderId}`, {method: 'PATCH', headers: {'Content-Type': 'application/json',}, body: JSON.stringify({ status: 'declined' }),})
          .then(response => response.json())
          .then(updatedOrder => {
          console.log('Order status updated:', updatedOrder);
          const cardToRemove = event.target.closest('.card');
          cardToRemove.remove();
        })
        .catch(error => console.error('Error updating order status:', error));
      }
    });
  })
  .catch(error => console.error('Error loading orders:', error));
  });

document.getElementById('order-btn-2').addEventListener('click', function() {
  // Загружаем текущие заказы из orders.json
  fetch('orders.json')
    .then(response => response.json())
    .then(data => {
      const ordersToUpdate = data.orders.filter(order => order.status === 'prepared'); 

      if (ordersToUpdate.length > 0) {
        ordersToUpdate.forEach(order => {
          fetch(`http://localhost:5000/api/orders/${order.id}`, {method: 'PATCH', headers: {'Content-Type': 'application/json',}, body: JSON.stringify({status: 'delivered',}),})
          .then(response => response.json())
          .then(updatedOrder => {
            console.log('Order delivered:', updatedOrder);
          })
          .catch(error => {
            console.error('Error updating order status:', error);
          });
        });
      } 
      else {
        console.log('No prepared orders to mark as delivered.');
      }
    })
    .catch(error => {
      console.error('Error loading orders:', error);
    });
});
checkOrders();
});



