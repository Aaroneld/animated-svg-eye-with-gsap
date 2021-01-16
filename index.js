import gsap from "gsap";

const iris = document.querySelector("#iris-pupil").children[1];
const container = document.querySelector("#eye-container");

const bRect = iris.getBoundingClientRect();
const center = [bRect.x + bRect.width / 2, bRect.y + bRect.height / 2];

const ray2Anim = gsap
  .to("#ray2", {
    rotate: 360,
    duration: 150,
    transformOrigin: "center",
    yoyo: true,
    ease: "elastic.out(1, 0.3)",
  })
  .pause();
const ray3Anim = gsap
  .to("#ray3", {
    rotate: 360,
    duration: 100,
    scaleX: 1.2,
    transformOrigin: "center",
    yoyo: true,
    ease: "elastic.out(1, 0.3)",
  })
  .pause();
const pupilAnim = gsap
  .to("#pupil", {
    scaleX: Math.random() * (1.2 - 0.9) + 0.9,
    scaleY: Math.random() * (1.2 - 0.9) + 0.9,
    transformOrigin: "center",
    yoyo: true,
    repeat: 11,
  })
  .pause();
const lineAnim = gsap
  .to("#lines-1", {
    rotate: 360,
    duration: 175,
    transformOrigin: "center",
    yoyo: true,
    ease: "elastic.out(1, 0.3)",
  })
  .pause();
const lines2Anim = gsap
  .to("#lines-2", {
    rotate: 360,
    duration: 125,
    scaleX: 1.2,
    transformOrigin: "center",
    yoyo: true,
    ease: "elastic.out(1, 0.3)",
  })
  .pause();

function leaveAnimations() {
  gsap.to("#iris-shadow", { x: 0, y: 0, ease: "bounce.out" });
  gsap.to("#reflection-1", { x: 0, y: 0, ease: "bounce.out" });
  gsap.to("#reflection-2", { x: 0, y: 0, ease: "bounce.out" });
  gsap.to("#eye-shadow", { x: 0 });

  pupilAnim.restart();
  ray2Anim.restart();
  ray3Anim.restart();
  lines2Anim.restart();
  lineAnim.restart();
}

function mouseMoveAnimations(intersection) {
  gsap.to("#iris-shadow", {
    x: intersection[0],
    y: intersection[1] > 0 ? intersection[1] * 0.7 : intersection[1],
    ease: "slow(0.7, 0.7, false)",
  });
  gsap.to("#reflection-1", {
    x: intersection[0] * 0.15,
    y: intersection[1] * 0.15,
    ease: "slow(0.7, 0.7, false)",
  });
  gsap.to("#reflection-2", {
    x: intersection[0] * 0.15,
    y: intersection[1] * 0.15,
    ease: "slow(0.7, 0.7, false)",
  });
  gsap.to("#eye-shadow", {
    x: intersection[0] * 0.12,
    y: intersection[1] * 0.12,
  });
}

function calculateDistance(x1, x2, y1, y2) {
  return Math.sqrt(Math.abs(x1 - x2 + (y1 - y2)));
}

function calculateSlope(x1, x2, y1, y2) {
  return x1 - x2 !== 0 ? (y1 - y2) / (x1 - x2) : "vert";
}

function determineQuadrant(x, y) {
  if (x > 0 && y > 0) return 1;
  if (x < 0 && y > 0) return 2;
  if (x < 0 && y < 0) return 3;
  if (x > 0 && y < 0) return 4;
}

function getRelativePosition(x1, x2, y1, y2) {
  return [x1 - x2, y1 - y2];
}

function getIntersection(radius, slope, quadrant) {
  const x = Math.sqrt(radius ** 2 / (1 + slope ** 2));

  console.log(radius);

  if (slope > 0) {
    return quadrant === 1
      ? [Math.abs(x), Math.abs(x * slope)]
      : [-Math.abs(x), -Math.abs(x * slope)];
  } else {
    return quadrant === 2
      ? [-Math.abs(x), Math.abs(x * slope)]
      : [Math.abs(x), -Math.abs(x * slope)];
  }
}

container.addEventListener("mousemove", (e) => {
  pupilAnim.restart().pause();

  const relPos = getRelativePosition(
    e.clientX,
    center[0],
    e.clientY,
    center[1]
  );
  const slope = calculateSlope(relPos[0], 0, relPos[1], 0);
  const quadrant = determineQuadrant(relPos[0], relPos[1]);

  const intersection = getIntersection(bRect.width / 2, slope, quadrant);

  mouseMoveAnimations(intersection);
});

container.addEventListener("mouseleave", (e) => {
  leaveAnimations();
});

// // console.log(e);
// // console.log("Distance:", calculateDistance(e.clientX, center[0], e.clientY, center[1]) )
// // console.log("Slope", calculateSlope(e.clientX, center[0], e.clientY, center[1]))

// // console.log(e.clientX - center[0], e.clientY - center[1]);
// const slope = calculateSlope(e.clientX - center [0], 0, e.clientY - center[1], 0)
// const points = generatePoints(e.clientX - center [0], 0, e.clientY - center[1], 0)

// // console.log('inverse', (1/slope));

// if(slope === 'vert') {
//     // console.log('vert');
//     0 - clientY > 0 ? gsap.to('#iris-pupil', { y: 10}) : gsap.to('#iris-pupil', { y: -10})

// }
// else if (slope === 0){
//     // console.log('horizontal');
//     0 - clientX > 0 ? gsap.to('#iris-pupil', { x: 10}) : gsap.to('#iris-pupil', { x: -10})
// }
// else if (slope < 0) {

//     if (e.clientX - center[0] < 0 && e.clientY - center[1] > 0) {

//         gsap.to('#iris-pupil', { x: findX(slope), y: 200})
//     } else {
//         gsap.to("#iris-pupil", {x : findX(slope), y: 200})
//     }
// } else {

//     if(e.clientX - center[0] < 0 && e.clientY - center[1] < 0) {
//         gsap.to("#iris-pupil", { x: findX(slope), y: 200})
//     }else {
//         gsap.to("#iris-pupil", {x : findX(slope), y: 200})
//     }
// }
