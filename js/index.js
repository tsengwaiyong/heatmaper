var heatmap_drawarea = $(".heatmap-drawarea");
var btn_redraw = $("#redraw");
var btn_undo = $("#undo");
var btn_redo = $("#redo");
var heatmap_points = [];
var heatmap_undo_points = [];
var heatmap_point;
var heatmap_data;

var heatmap_radius = $('input[name="heatmap-radius"]');
var heatmap_radius_value = heatmap_radius.val();

var heatmap_opacity = $('input[name="heatmap-opacity"]');
var heatmap_opacity_value = heatmap_opacity.val();
$('.heatmap').css("opacity", heatmap_opacity_value * 0.01);


//tooltips
$(".btn-round").mouseenter(function(e) {
  var tooltips_text = e.target.getAttribute("tooltips");
  var elment_centerX = e.clientX - e.offsetX + $(e.target).outerWidth() / 2;
  var elment_Y = e.clientY - e.offsetY;

  var $tooltips = $("<p class='tooltips'></p>");
  $("body").append($tooltips);
  $tooltips.text(tooltips_text);
  $tooltips.css({
    "display": "block",
    "top": elment_Y - 4,
    "left": elment_centerX
  });

  $(e.target).mouseleave(function() {
    $tooltips.remove();
  });
});

var drewboard_canmove = false;


heatmap_drawarea.mousedown(function(e) {
  // drewboard_canmove = true;
  heatmap_point = {
    x: e.offsetX,
    y: e.offsetY,
    radius: heatmap_radius_value,
    value: 1,
  };
  heatmap_points.push(heatmap_point);
  heatmap_draw();

  // heatmap_drawarea.mousemove(function(e) {
  //   if (drewboard_canmove) {
  //     heatmap_point = {
  //       x: e.offsetX,
  //       y: e.offsetY,
  //       radius: heatmap_radius_value,
  //       value: 1,
  //     };
  //     heatmap_points.push(heatmap_point);
  //     heatmap_draw();
  //   }
  // });
  //
  // heatmap_drawarea.mouseup(function(e) {
  //   drewboard_canmove = false;
  //
  // });

});


//操作区
btn_redraw.click(heatmap_redraw);
btn_undo.click(heatmap_undo);
btn_redo.click(heatmap_redo);

//工具区
heatmap_radius.change(function() {
  heatmap_radius_value = heatmap_radius.val();
  heatmapInstance.repaint();
});

heatmap_opacity.change(function() {
  heatmap_opacity_value = heatmap_opacity.val() * 0.01;
  $('.heatmap').css("opacity", heatmap_opacity_value);

});

function heatmap_redraw() {
  heatmap_points.length = 0;
  heatmap_undo_points.length = 0;
  heatmap_draw();
}

function heatmap_undo() {
  if (heatmap_points.length > 0) {
    heatmap_undo_points.push(heatmap_points[heatmap_points.length - 1]);
    heatmap_points.pop();
    heatmap_draw();
  }
}

function heatmap_redo() {
  if (heatmap_undo_points.length > 0) {
    heatmap_points.push(heatmap_undo_points[heatmap_undo_points.length - 1]);
    heatmap_undo_points.pop();
    heatmap_draw();
  }
}

function heatmap_draw() {
  heatmap_data = {
    data: heatmap_points
  };
  heatmapInstance.setData(heatmap_data);
  if (heatmap_points.length > 0) {
    btn_undo.removeClass("disable");
  } else {
    btn_undo.addClass("disable");
  }

  if (heatmap_undo_points.length > 0) {
    btn_redo.removeClass("disable");
  } else {
    btn_redo.addClass("disable");
  }
}