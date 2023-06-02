AFRAME.registerComponent("tour", {
    schema:{
      state:{type:"string",default:"places-list"},
      selectedCard:{type:"string",default:"#card1"}
    },
    init: function () {
      this.placesContainer = this.el;
      this.createCards();
    },

    createPlaces: function(){
        const details = {
            garden:{
                position:{ x:20, y:4.5, z:-5.5},
                rotation:{ x:0, y:-90, z:0},
                src:"./assets/thumbnails/garden.png",
                title:"Garden",
                id:"garden"
            },

            main_gate:{
                position:{ x:4.6, y:-5.5, z:25},
                rotation:{ x:0, y:-90, z:0},
                src:"./assets/thumbnails/main_gate.png",
                id:"main_gate"
            },

            home:{
                position:{ x:-9, y:34, z:0},
                rotation:{ x:0, y:0, z:0},
                src:"./assets/thumbnails/home.png",
                title:"My Home",
                id:"home"
            }
        }

        for (var key in details) {
            const item = details[key];
            const thumbnail = this.createThumbnail(item);
            const title = this.createTitle(item);
            thumbnail.appendChild(title);
            this.placesContainer.appendChild(thumbnail);
        }
    },
  
    createThumbnail: function(item) {
        const entityE1 = this.document.createElement("a-entity");
        const id = `place-${item.id}`;
        entityE1.setAttribute("visible", true);
        entityE1.setAttribute("id", id);
        entityE1.setAttribute("geometry",{
            primitive: "circle",
            radius:3
        });
        entityE1.setAttribute("position",item.position);
        entityE1.setAttribute("rotation",item.rotation);
        entityE1.setAttribute("material",{ src:item.src, opacity:0.6});
        entityE1.setAttribute("cursor-listener",{});
        return entityE1;
    },
  
    createTitleE1: function(position, item) {
        const entityE1 = document.createElement("a-entity")
        entityE1.setAttribute("text",{
        font:"exo2bold",
        align:"center",
        width:70,
        color:"#e65100",
        value:item.title,
      })
  
      const elPosition = position
      elPosition.y=-20
      entityE1.setAttribute("position",elPosition)
      entityE1.setAttribute("visible",true);
      return entityE1
    },
  
    hideEl:function (elList) {
      elList.map(el => {
        el.setAttribute("visible",false);
      })
    },
  
    showView: function(){
      const {selectedCard} = this.data;
      const skyEl = document.querySelector("#main-container")
      skyEl.setAttribute("material", {
        src: `./assets/360_images/${selectedCard}/place-0.jpg`,
        color:"#fff"
      })
    },
  
    tick: function(){
      const {state} = this.el.getAttribute('tour');
      if(state === "view"){
        this.hideEl([this.placesContainer])
        this.showView()
      }
    }
  
  });