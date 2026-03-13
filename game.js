const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 4,
    speedY: 4
};

const paddle = {
    x: 20,
    y: canvas.height / 2 - 50,
    width: 15,
    height: 100
};

window.paddleY = canvas.height / 2;

/* Typically
ctx.beginPath();    // begin new path
ctx.arc(...)        // define the shape
ctx.fillStyle = '#fff'  // set color
ctx.fill()          // fill
*/
function draw() {
    // begin with clearing the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();

    // draw paddle
    ctx.fillStyle = '#fff';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    // right wall
    ctx.fillStyle = '#fff';
    ctx.fillRect(canvas.width - 10, 0, 10, canvas.height);
}

function update() {
    paddle.y = window.paddleY - paddle.height / 2;
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // bounce from top and bottom walls
    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
        ball.speedY *= -1;
    }

    // bounce from right wall
    if (ball.x + ball.radius >= canvas.width - 10) {
        ball.speedX *= -1;
    }

    // bounce from paddle
    if (
        ball.x - ball.radius <= paddle.x + paddle.width &&
        ball.y >= paddle.y &&
        ball.y <= paddle.y + paddle.height
    ) {
        ball.speedX *= -1;
    }

    // ball is behing paddle
    if (ball.x - ball.radius <= 0) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();