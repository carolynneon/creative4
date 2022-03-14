<template>
  <div class="box-outer">
    <div class="box-inner"><slot /></div>
  </div>
</template>

<style scoped>
.box-outer {
  position: relative;
  padding: 8px 10px 10px;
  background: #fff;
}
.box-inner {
  height: 100%;
  padding: 6px 4px 4px;
  border: 2px solid #000;
  box-shadow:
    0 0 0 2px #fff, 0 2px 0 #000 inset,
    0 0 0 4px #000, 0 2px 0 4px #000;
}
.box-outer::before, .box-outer::after,
.box-inner::before, .box-inner::after {
  content: "";
  position: absolute;
  height: 16px;
  width: 16px;
  background: url("~@/assets/box-corners.png");
  background-size: 32px;
  image-rendering: pixelated;
}
.box-outer::before { top: 0; left: 0; }
.box-inner::before { top: 0; right: 0; background-position: -16px 0; }
.box-outer::after { bottom: 0; left: 0; background-position: 0 -16px; }
.box-inner::after { bottom: 0; right: 0; background-position: -16px -16px; }
</style>
