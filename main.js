/**
 * 明度を切り替えます。
 * @param {object} e - event object
 */
const trugBrightness = (e) => {
  const me = e.target;
  const parent = me.closest("div[id^='teeth_wrap']");
  const children = parent.children; //[teeth_wrap, pod_wrap, margin_wrap]
  const style = window.getComputedStyle(me).getPropertyValue("filter");
  if (style == null || style == "none") {
    me.style.filter = "brightness(0)";
    children[1].style.color = "#FFFFFF";
    children[2].style.color = "#FFFFFF";
  } else {
    me.style.filter = null;
    // 入力値のフォントカラーを白にして不可視っぽくします。
    children[1].style.color = "#000000";
    children[2].style.color = "#000000";
  }
};

window.addEventListener("load", function () {
  document.querySelectorAll(".teeth_svg > img").forEach((element) => {
    element.addEventListener("click", trugBrightness, false);
  });
});

const inputs = document.querySelectorAll("input");
const inputElements = [].slice.call(inputs); // Nodelistを配列に変換
/**
 * キーボードの一番うえの列で検査値を入力できるようにします。
 * @param {object} input - input要素
 */
const keyBind = (input) => {
  const key = {
    0: 10,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    "-": 11,
    "^": 12,
    "\\": 13,
  };
  let str = input.value;
  // 文頭から文末まで全て0-9かチェック
  const result = str.match(/[\d-^\\]/);
  if (result) {
    str = key[str.slice(-1)];
    input.value = str;
  } else {
    input.value = "";
  }

  // 入力後次のフォームへ移動
  const me = document.activeElement;
  const parent = me.parentNode.parentNode.parentNode;
  const parentID = parent.getAttribute("id");
  const i = inputElements.indexOf(document.activeElement);
  const editElm = inputs[i];
  const elmClass = editElm.getAttribute("class");
  if (["pod_d", "pod_c", "margin_d", "margin_c"].indexOf(elmClass) + 1) {
    (inputs[i + 1] || input[i]).focus();
    return;
  }
  if (["mgj", "mobility"].indexOf(elmClass) + 1) {
    (inputs[i + 8] || input[i]).focus();
    return;
  }
  if (["maxilla_b", "mandibular_b"].indexOf(parentID) + 1) {
    (inputs[i + 6] || input[i]).focus();
    return;
  } else {
    (inputs[i + 4] || input[i]).focus();
    return;
  }
};

// chart.js
document.getElementById("canvas_maxilla_b").style.width = "575px";
document.getElementById("canvas_maxilla_b").style.height = "86px";
const data = [
  4, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 3, 5, 4, 4, 5, 2, 6, 3, 4, 6, 3, 4, 2, 3,
  4, 3, 2, 3, 4, 2, 3, 4, 4, 5, 4, 5, 5, 6, 4, 3, 4, 5, 4, 3, 4, 5, 4,
];
const ctx = document.getElementById("canvas_maxilla_b").getContext("2d");
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: data.map((value, index) => ""),
    datasets: [
      {
        data: data,
        tension: 0.5,
        fill: "end",
        backgroundColor: "rgba(255, 0, 0, 0.3)",
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        max: 13,
        min: 0,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return " ";
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  },
});
