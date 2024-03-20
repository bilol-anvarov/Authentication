export const FormInputs = ({ name, text, type, exemple }) => {
    // const [value, setValue]
    return (
      <label htmlFor={name}>
        Your {text ? text : name}
        <br/>
        <input
          className={`mt-2 w-full rounded-l px-1 py-2 input input_${type} input_${name}`}
          type={type}
          id={name}
          placeholder={exemple}
        />
      </label>
    );
  };