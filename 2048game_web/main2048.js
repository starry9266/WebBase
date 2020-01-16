var board = new Array(); //布局
var score = 0; //分数
var hasConflicted = new Array;

$(function(){
  prepareForMobile();
  newgame();
});

function prepareForMobile(){

  if(documentWidth > 500){
    gridContainerWidth = 500;
    cellSpace = 20 ; 
    cellSideLength = 100 ;

  }

  $('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
  $('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
  $('#grid-container').css('padding',cellSpace);
  $('#grid-container').css('border-radius',0.02*gridContainerWidth);

  $('.grid-cell').css('width',cellSideLength);
  $('.grid-cell').css('height',cellSideLength);
  $('.grid-cell').css('border-radius',0.02*cellSideLength);
}

function newgame(){
  //初始化棋盘格
  init();
  //随机在两个格子生成数字
  generateOneNumber();
  generateOneNumber();
  
}

function init(){
  //对16个格子的位置赋值
  for(let i = 0; i<4 ; i++)
    for(let j = 0 ; j<4 ; j++){
      var gridCell = $('#grid-cell-'+i+'-'+j);
      gridCell.css('top',getPosTop(i,j));
      gridCell.css('left',getPosLeft(i,j));
    }

  for(let i = 0 ;i<4 ; i++){
    board[i] = new Array;
    hasConflicted[i] = new Array;
    for(let j = 0 ; j<4; j++){
      board[i][j]=0;
      hasConflicted[i][j]=false;
    }
      
  }

  updateBoardView();

  score = 0;
}

function updateBoardView(){

  $(".number-cell").remove();
  for( var i = 0 ; i < 4 ; i ++ )
      for( var j = 0 ; j < 4 ; j ++ ){
          $("#grid-container").append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
          var theNumberCell = $('#number-cell-'+i+'-'+j);

          if( board[i][j] == 0 ){
              theNumberCell.css('width','0px');
              theNumberCell.css('height','0px');
              theNumberCell.css('top',getPosTop(i,j) + cellSideLength/2 );
              theNumberCell.css('left',getPosLeft(i,j) + cellSideLength/2 );
              theNumberCell.css('font-size', cellSideLength*0.8+'px');
          }
          else{
              theNumberCell.css('width',cellSideLength);
              theNumberCell.css('height',cellSideLength);  
              theNumberCell.css('top',getPosTop(i,j));
              theNumberCell.css('left',getPosLeft(i,j));
              theNumberCell.css('background-color',getNumberBackgroundColor( board[i][j] ) );
              theNumberCell.css('color',getNumberColor( board[i][j] ) );
              theNumberCell.css('font-size',getSize(board[i][j]));
              theNumberCell.text( board[i][j] );
          }
          
          hasConflicted[i][j] = false;
      }
  $(".number-cell").css('line-height', cellSideLength+'px');
    
  
    
}


function generateOneNumber(){

  if( nospace( board ) )
      return false;

  //随机一个位置
  var randx = parseInt( Math.floor( Math.random()  * 4 ) );
  var randy = parseInt( Math.floor( Math.random()  * 4 ) );

  let times = 0 ;
  while( times < 50 ){
      if( board[randx][randy] == 0 )
          break;

      randx = parseInt( Math.floor( Math.random()  * 4 ) );
      randy = parseInt( Math.floor( Math.random()  * 4 ) );
      
      times++;
  }

  if(times == 50){
    for( var i = 0 ; i < 4 ; i ++ )
      for( var j = 0 ; j < 4 ; j ++ ){
        if(board[i][j] == 0){
          randx = i;
          randy = j;
        }
      }
  }


  //随机一个数字
  var randNumber = Math.random() < 0.5 ? 2 : 4;

  //在随机位置显示随机数字
  board[randx][randy] = randNumber;
  showNumberWithAnimation( randx , randy , randNumber );

  return true;
}

$(document).keydown(function(event){
  switch(event.keyCode){
    case 37:  //left
      if(moveLeft()){
        setTimeout("generateOneNumber()",210);
        setTimeout("isgameover()",300);
      }
      break;
    case 38:  //up
      if(moveUp()){
        setTimeout("generateOneNumber()",210);
        setTimeout("isgameover()",300);
      }
      break;
    case 40:  //down
      if(moveDown()){
        setTimeout("generateOneNumber()",210);
        setTimeout("isgameover()",300);
      }
      break;  
    case 39:  //right
      if(moveRight()){
        setTimeout("generateOneNumber()",210);
        setTimeout("isgameover()",300);
      }
      break;  
    
      default:
        break;
  }
})


function moveLeft(){
  if(!canMoveLeft(board))
    return false;

  for(let i = 0; i<4 ; i++)
    for(let j = 1 ; j<4 ; j++){
      if(board[i][j] != 0){
        
        for(let k = 0 ; k < j ; k ++)
          if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
            //向左移动
            showMoveAnimation(i,j,i,k);
            board[i][k] = board[i][j];
            board[i][j] = 0;

            continue;
          }

          else if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
            //向左移动
            showMoveAnimation(i,j,i,k);
            board[i][k] += board[i][j];
            board[i][j] = 0;
            //数值相加
            
            
            score += board[i][k];
            updateScore(score);
            hasConflicted[i][k]=true;
            continue;
          }
      }
    }

  setTimeout("updateBoardView()",200);
  return true;
}


function moveUp(){
  if(!canMoveUp(board))
    return false;

  for(let i = 1; i<4 ; i++)
    for(let j = 0 ; j<4 ; j++){
      if(board[i][j] != 0){
        
        for(let k = 0 ; k < i ; k ++)
          if(board[k][j]==0 && noBlock(j,k,i,board)){
            //向上移动
            showMoveAnimation(i,j,k,j);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            continue;
          }

          else if(board[k][j]==board[i][j] && noBlock(j,k,i,board) && !hasConflicted[k][j]){
            //向上移动
            showMoveAnimation(i,j,k,j);
            board[k][j] += board[i][j];
            board[i][j] = 0;
            //数值相加
  
            score += board[k][j];
            updateScore(score);
            hasConflicted[k][j] = true;
            continue;
          }
      }
    }

  setTimeout("updateBoardView()",200);
  return true;
}

function moveRight(){
  if( !canMoveRight( board ) )
      return false;

  //moveRight
  for( var i = 0 ; i < 4 ; i ++ )
      for( var j = 2 ; j >= 0 ; j -- ){
          if( board[i][j] != 0 ){
              for( var k = 3 ; k > j ; k -- ){

                  if( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) ){
                      showMoveAnimation( i , j , i , k );
                      board[i][k] = board[i][j];
                      board[i][j] = 0;
                      continue;
                  }
                  else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board ) && !hasConflicted[i][k] ){
                      showMoveAnimation( i , j , i , k);
                      board[i][k] *= 2;
                      board[i][j] = 0;

                      score += board[i][k];
                      updateScore(score);
                      hasConflicted[i][k] = true;

                      continue;
                  }
              }
          }
      }

  setTimeout("updateBoardView()",200);
  return true;
}

function moveDown(){
  if(!canMoveDown(board))
    return false;

  for(let i = 2; i>=0 ; i--)
    for(let j = 0 ; j<4 ; j++){
      if(board[i][j] != 0){
        
        for(let k = 3 ; k > i ; k --)
          if(board[k][j]==0 && noBlock(j,i,k,board)){
            //向下移动
            showMoveAnimation(i,j,k,j);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            continue;
          }

          else if(board[k][j]==board[i][j] && noBlock(j,i,k,board) && !hasConflicted[k][j]){
            //向下移动
            showMoveAnimation(i,j,k,j);
            board[k][j] += board[i][j];
            board[i][j] = 0;
            //数值相加
            
            score += board[k][j];
            updateScore(score);
            hasConflicted[k][j] = true;
            continue;
          }
      }
    }

  setTimeout("updateBoardView()",200);
  return true;
}




function isgameover(){
  if( nospace(board) && nomove(board) ){
    gameover();
  }
    
}



function gameover(){
  alert('gameover 你的分数是：'+score);
}