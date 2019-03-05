var realWindowWidth = 0;
var realWindowHeight = 0;
wx.getSystemInfo({
  success: function (res) {
    realWindowWidth = res.windowWidth
    realWindowHeight = res.windowHeight
  }
})

// 计算视觉优先的图片宽高
function wxAutoImageCal(originalWidth, originalHeight, padding) {

  // 获取图片的原始长宽
  var windowWidth = 0, windowHeight = 0;
  var autoWidth = 0, autoHeight = 0;
  var results = {};
  windowWidth = realWindowWidth - 2 * padding;
  windowHeight = realWindowHeight;

  // 判断按照那种方式进行缩放
  // 在图片width大于手机屏幕width时候
  if (originalWidth > windowWidth) {
    autoWidth = windowWidth;
    autoHeight = (autoWidth * originalHeight) / originalWidth;
    results.imageWidth = autoWidth;
    results.imageHeight = autoHeight;
  }
  // 否则展示原来的数据
  else {
    results.imageWidth = originalWidth;
    results.imageHeight = originalHeight;
  }
  return results;
}

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    item: {
      type: Object,
      value: {}
    },
    padding: {
      type: Number,
      value: 5
    },
    // 列表项时，列表的样式
    listStyle: {
      type: String,
      value: 'circle'
    }
  },
  data: {
    images: [],
    imageUrls: []
  },
  methods: {
    /**
    * 图片视觉宽高计算
    **/
    wxmlImgLoad(e) {
      const { idx, src } = e.target.dataset;

      var recal = wxAutoImageCal(e.detail.width, e.detail.height, this.data.padding);
      this.setData({
        ['images[' + idx + ']']: { width: recal.imageWidth, height: recal.imageHeight },
        ['imageUrls[' + idx + ']']: e.currentTarget.dataset.src
      })
    },
    // 图片点击事件
    wxmlImgTap(e) {
      var nowImgUrl = e.target.dataset.src;

      var imageUrls = this.data.imageUrls,
        newImageUrls = [];
      for (var i in imageUrls) {
        if (imageUrls[i] !== undefined) {
          newImageUrls.push(imageUrls[i]);
        }
      }
      if (newImageUrls.length > 0) {
        wx.previewImage({
          current: nowImgUrl,
          urls: newImageUrls
        })
      }
    },
    // a标签点击事件
    wxmlTagATap: function (e) {
      this.triggerEvent('WxmlTagATap', {
        src: e.currentTarget.dataset.src
      });
    }
  }
})