const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

let _settings;

function init() {
  let schema = Me.metadata['settings-schema'];
  let source = Gio.SettingsSchemaSource.new_from_directory(Me.dir.get_path(),
    Gio.SettingsSchemaSource.get_default(), false)
  _settings = new Gio.Settings({
    settings_schema: source.lookup(schema, true),
  });
}

function switchWidget(key, name) {
  let box = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL});
  box.pack_start(new Gtk.Label({
    label: name,
    halign: Gtk.Align.START,
    hexpand: true,
  }), true, true, 6);
  let widget = new Gtk.Switch();
  _settings.bind(key, widget, 'state', Gio.SettingsBindFlags.DEFAULT);
  box.pack_end(widget, false, false, 6);
  return box;
}

function buildPrefsWidget() {
  let widget = new Gtk.Box({orientation: Gtk.Orientation.VERTICAL});
  widget.add(switchWidget('show-workspace-numbers', 'Show Workspace Numbers'));
  widget.add(switchWidget('highlight-current-workspace', 'Highlight Current Workspace'));
  widget.add(switchWidget('icons-on-right', 'Icons On Right'));
  widget.show_all();
  return widget;
}
