
// you  can do this with class but: 
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields
// the private fields  feature is behind 
// the javascript.options.experimental.private_fields preferences 
// (needs to be set to true) and the javascript.options.experimental.private_methods
//  preferences (needs to be set to true). To change preferences in Firefox, visit about:config.
(()=>{
const column_titles = ['a','b','c','d','e','f','g','h'];
const chessPiecesBase = function(){
      this.render = function(){
          return render();
      }
      let pieces = {White:[],Black:[]};
      const pieceAdd = function(color,type,position){
           pieces[color].push({
                'type'     : type,
                'position' : position
           });
      }
      const pieceRender  = function (color, type){
          const piece = document.createElement('img');
          piece.setAttribute(
              'src',
              `./assets/${color}${type}.png`
          );
         return piece
      }
      const pieceTo = function(color,type,position){
           document.getElementById(
              'cube_'+position
           ).getElementsByTagName(
              'div'
           )[0].appendChild(
              pieceRender(color, type)
           );
      }
      const piecesRender  = function(){
          for(const color in pieces)
              for(const id in pieces[color])
                  pieceTo(
                      color,
                      pieces[color][id].type,
                      pieces[color][id].position,
                 );
      }
      const pieceRemove = function(position){
           document.getElementById(
              'cube_'+position
           ).getElementsByTagName(
              'div'
           )[0].innerHTML ="";
      }
      const piecesClean  = function(){
          for(const number of [1,2,3,4,5,6,7,8])
              for(const column of column_titles)
                  pieceRemove(
                      column+number,
                 );
      }
      const piecesToStartPosition = function(){
             pieces = {White:[],Black:[]};
             for(const column of column_titles)
                  pieceAdd(
                      'White',
                      'Pawn',
                      column+'2'
                  );
             for(const column of column_titles)
                  pieceAdd(
                      'Black',
                      'Pawn',
                      column+'7'
                  );
             for(const column of ['a','h'])
                  pieceAdd(
                      'White',
                      'Rook',
                      column+'1'
                  );
             for(const column of ['a','h'])
                  pieceAdd(
                      'Black',
                      'Rook',
                      column+'8'
                  );
             for(const column of ['b','g'])
                  pieceAdd(
                      'White',
                      'Knight',
                      column+'1'
                  );
             for(const column of ['b','g'])
                  pieceAdd(
                      'Black',
                      'Knight',
                      column+'8'
                  );
             for(const column of ['c','f'])
                  pieceAdd(
                      'White',
                      'Bishop',
                      column+'1'
                  );
             for(const column of ['c','f'])
                  pieceAdd(
                      'Black',
                      'Bishop',
                      column+'8'
                  );
             pieceAdd(
                 'White',
                 'Queen',
                 'd1'
             );
             pieceAdd(
                 'Black',
                 'Queen',
                 'd8'
             );
             pieceAdd(
                 'White',
                 'King',
                 'e1'
             );
             pieceAdd(
                 'Black',
                 'King',
                 'e8'
             );
      }
      const render = function(){
          piecesClean();
          piecesRender();
      }
      piecesToStartPosition();
      render();
}


const chessTableBase = function(){
      this.render = function(){
          return render();
      }
      const field = function (column_name, line_number) { 
          const cube = document.createElement('div');
          const card = document.createElement('div');
          const empty = document.createElement('div');
          cube.className = 'flip-card';
          cube.setAttribute(
              'id',
              'cube_'+column_name+line_number
          );
          card.className = 'flip-card-back';
          cube.appendChild(card);
          cube.appendChild(empty);
          return cube;

      }
      const column = function(column_name){
           const section = document.createElement('section');
           section.setAttribute(
               'id',
                   ('column_'+column_name.toString())
           );
           for (const line_number of [8,7,6,5,4,3,2,1])
               section.appendChild(
                   field(
                       column_name,
                       line_number
                   )
               );
           return section;

      }
      const table = function(){
           const main = document.getElementsByTagName('main')[0];
           main.innerHTML="";
           for(const column_name of column_titles)
               main.appendChild(
                   column(column_name)
               );
      }
      const render = function(){
          table();
      }
      render();
}


const chessMainBase = function(){
    const table =  new chessTableBase();
    const pieces = new chessPiecesBase();
    const render = function(){
        table.render();
        pieces.render();
    }
    render();
}

window.onload = function(){
     new chessMainBase();
}

})();
