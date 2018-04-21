import {Controller, Get, Post, HttpCode, Body} from 'routing-controllers'
import Game from './games/entity'
import { Entity } from 'typeorm';

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
  

}