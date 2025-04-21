import { useEffect } from 'react';

const useScript = ({ src, id, attributes }) => {

  useEffect(() => {

    const script = document.createElement('script');
    script.src = src;
    script.id = id;

    // Set individual attributes using setAttribute
    Object.keys(attributes).forEach((key) => {
      script.setAttribute(key, attributes[key]);
    });

    document.body.appendChild(script);
    console.log('script', script)

    return () => {
      document.body.removeChild(script);
    };
  }, [attributes]);
};

export default useScript;
