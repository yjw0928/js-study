class Demo {
  constructor() {
    console.log("demo");
  }

  public func1() {
    console.log(this);
  }

  public func2 = () => {
    console.log(this);
  };
}

const demo = new Demo();
demo.func1();
demo.func2();

const { func1, func2 } = demo;
func1();
func2();
