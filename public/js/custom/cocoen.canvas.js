class Cocoen {
    constructor(id, containerId, element, options) {
      this.options = Object.assign({}, Cocoen.defaults, options);
      this.id = id;
      this.containerId = containerId;
      this.element = element || document.querySelector(`#${this.containerId}`);
      this.init();
    }
  
    init() {
      this.createElements();
      this.addEventListeners();
      this.dimensions();
    }
  
    createElements() {
      // Create drag element
      const span = document.createElement('span');
      span.className = this.options.dragElementSelector.replace('.', '');
      this.element.appendChild(span);
      this.firstImage = this.element.querySelector(`#${this.id}:first-child`).querySelector(':first-child');
      this.dragElement = this.element.querySelector(this.options.dragElementSelector);
      this.beforeElement = this.element.querySelector('div:first-child');
      this.beforeImage = this.beforeElement.querySelector('canvas');
      this.afterImage = this.element.querySelector(`.hdr-image`);
    }
  
    addEventListeners() {
      this.element.addEventListener('click', this.onTap.bind(this));
      this.element.addEventListener('mousemove', this.onDrag.bind(this));
      this.element.addEventListener('touchmove', this.onDrag.bind(this));
      this.dragElement.addEventListener('mousedown', this.onDragStart.bind(this));
      this.dragElement.addEventListener('touchstart', this.onDragStart.bind(this));
  
      window.addEventListener('mouseup', this.onDragEnd.bind(this));
      window.addEventListener('resize', this.dimensions.bind(this));
    }
  
    dimensions() {
      this.elementWidth = parseInt(window.getComputedStyle(this.element).width, 10);
      this.elementHeight = parseInt(window.getComputedStyle(this.element).height, 10);
      this.elementOffsetLeft = this.element.getBoundingClientRect().left + document.body.scrollLeft;
      this.beforeImage.style.width = `${this.elementWidth}px`;
      this.beforeImage.style.height = `100%`;
      this.afterImage.style.width = `${this.elementWidth}px`;
      this.afterImage.style.height = `100%`;
      this.dragElementWidth = parseInt(window.getComputedStyle(this.dragElement).width, 10);
      this.minLeftPos = this.elementOffsetLeft;
      this.maxLeftPos = (this.elementOffsetLeft + this.elementWidth) - this.dragElementWidth;
    }
  
    onTap(e) {
      e.preventDefault();
  
      this.leftPos = (e.pageX) ? e.pageX : e.touches[0].pageX;
      this.requestDrag();
    }
  
    onDragStart(e) {
      e.preventDefault();
  
      const startX = (e.pageX) ? e.pageX : e.touches[0].pageX;
      const offsetLeft = this.dragElement.getBoundingClientRect().left + document.body.scrollLeft;
      this.posX = (offsetLeft + this.dragElementWidth) - startX;
      this.isDragging = true;
    }
  
    onDragEnd(e) {
      e.preventDefault();
      this.isDragging = false;
    }
  
    onDrag(e) {
      e.preventDefault();
  
      if (!this.isDragging) {
        return;
      }
  
      this.moveX = (e.pageX) ? e.pageX : e.touches[0].pageX;
      this.leftPos = (this.moveX + this.posX) - this.dragElementWidth;
  
      this.requestDrag();
    }
  
    drag() {
      if (this.leftPos < this.minLeftPos) {
        this.leftPos = this.minLeftPos;
      } else if (this.leftPos > this.maxLeftPos) {
        this.leftPos = this.maxLeftPos;
      }
  
      let openRatio = (this.leftPos + (this.dragElementWidth / 2)) - this.elementOffsetLeft;
      openRatio /= this.elementWidth;
      const width = `${openRatio * 100}%`;
  
      this.dragElement.style.left = width;
      this.beforeElement.style.width = width;
  
      if (this.options.dragCallback) {
        this.options.dragCallback(openRatio);
      }
    }
  
    requestDrag() {
      window.requestAnimationFrame(this.drag.bind(this));
    }
  }
  
  Cocoen.defaults = {
    dragElementSelector: '.cocoen-drag',
    dragCallback: null,
  };
  
//   module.exports.default = Cocoen;