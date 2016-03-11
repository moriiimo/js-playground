/**
 * Created by amorimoto on 16/03/11.
 */
import Animal from './animal';
class Dog extends Animal {
  constructor(name) {
    super(name);
  }

  callName() {
    alert(this.name);
  }
}

var dog = new Dog('Natsu');
dog.callName();