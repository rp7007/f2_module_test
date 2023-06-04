const statusDiv = document.getElementById('status');

function getMenu() {
  fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
    .then(response => response.json())
    .then(data => {
      const menuList = document.getElementById('menu');
      data.forEach(item => {
        const menuItem = document.createElement('li');
        menuItem.innerText = `${item.name} - $${item.price}`;
        menuList.appendChild(menuItem);
      });
    })
    .catch(error => {
      console.log(error);
    });
}

function takeOrder() {
  statusDiv.innerText = 'Taking Order...';
  return new Promise(resolve => {
    setTimeout(() => {
      const order = {
        burger1: 'Chicken Burger',
        burger2: 'Veggie Burger',
        burger3: 'Cheeseburger'
      };
      resolve(order);
    }, 2500);
  });
}

function orderPrep() {
  statusDiv.innerText = 'Preparing Order...';
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({order_status: true, paid: false});
    }, 1500);
  });
}

function payOrder() {
  statusDiv.innerText = 'Paying for Order...';
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({order_status: true, paid: true});
    }, 1000);
  });
}

function thankyouFnc() {
  alert('Thank you for eating with us today!');
}

getMenu();

takeOrder()
  .then(order => {
    statusDiv.innerText = 'Order Placed. Your Order:';
    const menuList = document.getElementById('menu');
    for (let key in order) {
      const orderItem = document.createElement('li');
      orderItem.innerText = `${key}: ${order[key]}`;
      menuList.appendChild(orderItem);
    }
    return orderPrep();
  })
  .then(status => {
    if (status.order_status) {
      return payOrder();
    } else {
      throw new Error('Order could not be prepared.');
    }
  })
  .then(status => {
    if (status.paid) {
      statusDiv.innerText = '';
      thankyouFnc();
    } else {
      throw new Error('Payment unsuccessful.');
    }
  })
  .catch(error => {
    console.log(error);
  });
