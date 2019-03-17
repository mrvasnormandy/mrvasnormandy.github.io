require('../../stylesheets/sass/index.scss');
import Rubbery from './modules/rubbery/Rubbery';
import Slideshow from './modules/slideshow/Slideshow';

document.querySelectorAll(".rubbery").forEach(v => {
  new Rubbery(v);
});

document.getElementById("contactBtn").addEventListener("click", event => {
  let contact = document.getElementById("contactContainer");
  let info = document.getElementById("infoContainer");
  if (anyAnimating([contact, info]))
    return;
  transitionOutTransitionIn(
    info,
    "fadeOut",
    contact,
    "fadeIn"
  );
});

document.getElementById("cancelContactBtn").addEventListener("click", event => {
  let contact = document.getElementById("contactContainer");
  let info = document.getElementById("infoContainer");
  if (anyAnimating([contact, info]))
    return;
  transitionOutTransitionIn(
    contact,
    "fadeOut",
    info,
    "fadeIn"
  );
});

function anyAnimating(arr) {
  for (let i = 0; i < arr.length; i++)
    if (isAnimating(arr[i]))
      return true;
  return false;
}

function isAnimating(e) {
  return e.classList.contains("animated");
}

function oneTimeEvent(element, eventType, callback) {
  element.addEventListener(eventType, function callee(e) {
    e.target.removeEventListener(e.type, callee);
    return callback(e);
  });
}

function transitionOutTransitionIn(transitionOut, animationOut, transitionIn, animationIn) {
  transitionOut.classList.add("animated");
  transitionOut.classList.add(animationOut);
  oneTimeEvent(transitionOut, "animationend", e => {
    if (e.target !== transitionOut)
      return;
    transitionOut.style.display = 'none';
    transitionOut.classList.remove("animated");
    transitionOut.classList.remove(animationOut);
    transitionIn.classList.add("animated");
    transitionIn.classList.add(animationIn);
    transitionIn.style.display = 'block';
    oneTimeEvent(transitionIn, "animationend", e => {
      if (e.target !== transitionIn)
        return;
      transitionIn.classList.remove("animated");
      transitionIn.classList.remove(animationIn);
    });
  });
}

document.querySelectorAll(".slideshow").forEach((e) => {
  var images = [
    'url("https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80")',
    'url("https://images.unsplash.com/photo-1414500923875-1704944d8df7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80")',
    'url("https://images.unsplash.com/photo-1495567720989-cebdbdd97913?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
    'url("https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-1.2.1&auto=format&fit=crop&w=1378&q=80")',
    'url("https://images.unsplash.com/photo-1467173572719-f14b9fb86e5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80")',
    'url("https://images.unsplash.com/photo-1490682143684-14369e18dce8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
    'url("https://images.unsplash.com/photo-1437243964124-5379b751d09a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80")',
    'url("https://images.unsplash.com/photo-1418985991508-e47386d96a71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80")',
    'url("https://images.unsplash.com/photo-1483030096298-4ca126b58199?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80")',
    'url("https://images.unsplash.com/photo-1502261159926-e31d770eb6e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=881&q=80")',
  ];
  new Slideshow(e, images, 15000, 5000);
});