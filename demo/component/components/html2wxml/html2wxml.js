var html2wxml = require('html2wxml-main.js');

Component({
    data: {},
    options: {
        addGlobalClass: true
    },
    properties: {
        text: {
            type: String,
            value: null,
            observer: function(newVal, oldVal) {
                if (newVal == '') return;

                if (this.data.type == 'html' || this.data.type == 'markdown' || this.data.type == 'md') {
                    var data = {
                        text: this.data.text,
                        type: this.data.type,
                        highlight: this.data.highlight,
                        linenums: this.data.linenums
                    };

                    if (this.data.imghost != null) {
                        data.imghost = this.data.imghost;
                    }

                    wx.request({
                        url: 'https://www.qwqoffice.com/html2wxml/',
                        data: data,
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: res => {
                          this.setData({
                            nodes: res.data
                          })
                        }
                    })
                }
            }
        },
        json: {
            type: Object,
            value: {},
            observer: function(newVal, oldVal) {
              this.setData({
                nodes: this.data.json
              })
            }
        },
        type: {
            type: String,
            value: 'html'
        },
        highlight: {
            type: Boolean,
            value: true,
        },
        highlightStyle: {
            type: String,
            value: 'darcula'
        },
        linenums: {
            type: Boolean,
            value: true,
        },
        padding: {
            type: Number,
            value: 5
        },
        imghost: {
            type: String,
            value: null
        },
        showLoading: {
            type: Boolean,
            value: true
        }
    },
    data: {
      nodes: null
    },
    methods: {
    },
    attached: function() {}
})