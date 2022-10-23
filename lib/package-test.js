'use babel';

import PackageTestView from './package-test-view';
import { CompositeDisposable } from 'atom';

export default {

  packageTestView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.packageTestView = new PackageTestView(state.packageTestViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.packageTestView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'package-test:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.packageTestView.destroy();
  },

  serialize() {
    return {
      packageTestViewState: this.packageTestView.serialize()
    };
  },

  toggle() {
    console.log('PackageTest was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
