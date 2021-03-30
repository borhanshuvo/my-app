import React, { useContext } from 'react';
import './Shipment.css';
import { UserContext } from '../../App';
import { useForm } from 'react-hook-form';

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Enter Your Name" />
      {errors.name && <span className="error">Name field is required</span>}

      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Enter Your Email" />
      {errors.email && <span className="error">Email field is required</span>}

      <input name="address" ref={register({ required: true })} placeholder="Enter Your Address" />
      {errors.address && <span className="error">Address field is required</span>}

      <input name="phone" ref={register({ required: true })} placeholder="Enter Your Phone Number" />
      {errors.phone && <span className="error">Phone Number field is required</span>}
      
      <input type="submit" />
    </form>
    );
};

export default Shipment;