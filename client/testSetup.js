import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

// eslint-disable-next-line @typescript-eslint/no-empty-function
window.URL.createObjectURL = function() {

};
