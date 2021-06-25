import { connect } from 'react-redux';
import Navigation, { NavigationSection } from '../components/Navigation';
import { AppDispatch, AppState } from '../store';
import * as actions from '../actions';

const mapStateToProps = (state: AppState) => ({
  section: state.currentSection as NavigationSection,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSectionChanged: (section: NavigationSection) => {
    dispatch(
      actions.switchSection({ section }),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
