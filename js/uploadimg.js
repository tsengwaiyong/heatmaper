var heatmapInstance;
var ctx, cvs = document.querySelector('.cvs');
var img_width, img_height;



function upload(e) {
  const file = e.target.files[0];
  var reader = new FileReader();
  reader.readAsDataURL(file); //转化成base64数据类型

  reader.onload = function() {
    drawToCanvas(this.result);

  };
  console.log(e.target.files);
}

function drawToCanvas(imgData) {

  ctx = cvs.getContext('2d');
  var img = new Image();
  img.src = imgData;
  var layer = $("<img class='layer' src=" + img.src + "></img>");
  $(".layerbar").append(layer);

  img.onload = function() { //必须onload之后再画
    $(".heatmap-drawarea").css("display", "block");
    $(".heatmap-drawarea").css("width", this.width);
    $(".heatmap-drawarea").css("height", this.height);


    cvs.width = this.width;
    cvs.height = this.height;
    ctx.drawImage(img, 0, 0, this.width, this.height);
    strDataURI = cvs.toDataURL(); //获取canvas base64数据

    //创建热图canvas
    heatmapInstance = h337.create({
      container: document.querySelector('.heatmap'),
      backgroundColor: "rgba(0, 0, 0, 0)",
    });
  };

  $(".upload").css("display", "none");
  $(".actionbar").css("display", "flex");
}

$(".download").click(function() {
  downLoadImage("图片")
});


function downLoadImage(name) {

  var savecanvas = document.createElement('canvas');
  savecanvas.width = $(".cvs").width();
  savecanvas.height = $(".cvs").height();
  var savecanvas_ctx = savecanvas.getContext("2d");
  savecanvas_ctx.drawImage(cvs, 0, 0);
  //获取一次透明度
  heatmap_opacity_value = heatmap_opacity.val() * 0.01;
  savecanvas_ctx.globalAlpha = heatmap_opacity_value;
  savecanvas_ctx.drawImage($(".heatmap-canvas")[0], 0, 0);
  var a = document.createElement("a");
  a.href = savecanvas.toDataURL();
  a.download = name;
  a.click();
}