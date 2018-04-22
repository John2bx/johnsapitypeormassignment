import {Controller, Get, Post, HttpCode, Body, Put, Param, NotFoundError, BadRequestError } from 'routing-controllers'
import Game from './games/entity'
import { Entity, AfterUpdate } from 'typeorm';
import { validate } from 'class-validator';

const moves = (board1, board2) => 
    board1
      .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
      .reduce((a, b) => a.concat(b))
      .length

@Controller()
export default class MainController {

  @Get('/games')
  async allgames() {
    const games = await Game.find()
    return { games }
  }
  
  @Post('/games')
@HttpCode(201)
createGame(
  @Body() game: Game,
  
) {
  const colors = ['red', 'blue', 'green', 'yellow', 'magenta']
  game.color = colors[Math.floor(Math.random() * colors.length)];

  const initialboard =[["o", "o", "o"],["o", "o", "o"],["o", "o", "o"]]
  game.board = initialboard
  return game.save()
}
 
@Put('/games/:id')
async updateGame(
  @Param('id') id: number,
  @Body() update: Partial<Game>
) {
  const game = await Game.findOne(id)
  if (!game) {throw new NotFoundError('Cannot find game')}
  else if(update.board && moves(update.board,game.board)>1){

    return BadRequestError
    
  }
  else{
  validate(AfterUpdate)
  return Game.merge(game, update).save()
  }
}

}