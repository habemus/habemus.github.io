(function () {

  Polymer({
    is: 'habemus-structure',
    properties: {
      x1: {
        type: Number,
        notify: true,
        value: 160
      },
      x2: {
        type: Number,
        notify: true,
        value: 700
      },

      previewMode: {
        type: String,
        notify: true,
        value: '',
        observer: '_previewModeChanged'
      }
    },

    handleTrackX1: function (e) {
      var ddx = e.detail.ddx || 0;

      var currentx1 = this.get("x1");

      var newx1 = currentx1 + ddx;

      if (typeof newx1 == 'number') {
        this.set('x1', newx1);
      } else {
        console.warn('x1 not a number');
      }

      if (ddx >= 0) {
        this.set('x2', this.get("x2") + ddx);
      }

      if (newx1 <= 10) {
        this.set('x1', 10);
      }

      if (newx1 >= 1000) {
        this.set('x1', 1000);
      }
    },

    handleTrackX2: function (e) {

      if (e.detail.state === 'start') {
        Polymer.Base.toggleClass('dragging', true, e.target);
      }

      if (e.detail.state === 'end') {
        Polymer.Base.toggleClass('dragging', false, e.target);
      }

      var ddx = e.detail.ddx || 0;

      var currentx2 = this.get("x2");
      var newx2 = currentx2 + ddx;
      var currentx1 = this.get("x1");

      if (typeof newx2 == 'number') {
        this.set('x2', newx2);
      } else {
        console.warn('x2 not a number');
      }

      var documentWidth  = document.body.offsetWidth;

      if ( newx2 <= currentx1 + 10 ) {
        this.set('x2', currentx1 + 10);
      }

      e.stopPropagation();
    },

    handleMouseoverX2: function (e) {

      Polymer.Base.toggleClass('dragging', true, e.target);
    },

    handleMouseoutX2: function (e) {
      Polymer.Base.toggleClass('dragging', false, e.target);
    },

    calcEditorWidth: function (x1, x2) {
      return x2 - x1;
    },


    // adjust previewer width when previewMode is smaller than the document width
    _previewModeChanged: function (newPreviewMode, oldPreviewMode) {

      var desktopWidth   = 1024;
      var tabletWidth    = 768;
      var mobileWidth    = 400;
      var documentWidth  = document.body.offsetWidth;
      var x2             = this.x2;

      if (newPreviewMode === "desktop" && (x2 + desktopWidth < documentWidth)) {
        this.set('x2', documentWidth - desktopWidth);

      } else if (newPreviewMode === "tablet" && (x2 + tabletWidth < documentWidth)) {
        this.set('x2', documentWidth - tabletWidth);
      
      } else if (newPreviewMode === "mobile" && (x2 + mobileWidth < documentWidth)) {
        this.set('x2', documentWidth - mobileWidth);
      }
    }
  });
})();
