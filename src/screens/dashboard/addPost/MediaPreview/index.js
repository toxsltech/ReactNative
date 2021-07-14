/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import MediaPreview from './MediaPreview';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onAddStory } from '../../../../modules/AddStory';
import { onAddPosts } from '../../../../modules/AddPosts';

const mapStateToProps = state => ({
  isBusyProfile: state.AddStoryReducer.isBusy,
  storyResponse: state.AddStoryReducer.response,

  isBusyProfile: state.AddPostsReducer.isBusy,
  postsResponse: state.AddPostsReducer.response,
});

export default connect(
  mapStateToProps,
  dispatch => {
    return {
      onAddStory: bindActionCreators(onAddStory, dispatch),
      onAddPosts: bindActionCreators(onAddPosts, dispatch),
    };
  },
)(MediaPreview);
