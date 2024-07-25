const get_device_Id =require( "../../middlewere/get_device_Id")


 test(`test id==2 ${2}`, () => {
     expect(get_device_Id(2)).toBe(2);
 });
