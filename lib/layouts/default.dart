import 'package:flutter/material.dart';
import 'package:expidus_website/utils.dart' show AutoScaler;

final _navItems = {
  '/': 'Home',
  '/download': 'Download',
};

class DefaultLayout extends StatefulWidget {
  DefaultLayout({Key? key, required this.themeNotifier, this.child}) : super(key: key);

  final ValueNotifier<ThemeMode> themeNotifier;
  final Widget? child;

  @override
  State<DefaultLayout> createState() => _DefaultLayoutState();
}

class _DefaultLayoutState extends State<DefaultLayout> {
  @override
  Widget build(BuildContext context) {
    var isNotLarge = AutoScaler.ltLarge.fits(MediaQuery.of(context));
    return Scaffold(
      appBar: AppBar(
        title: const Text('ExpidusOS'),
        actions: isNotLarge ? null : _navItems.map((k, v) => MapEntry(k,
          Padding(
            padding: EdgeInsets.all(4.0),
            child: TextButton(
              onPressed: () {
                Navigator.of(context).pushNamed(k);
              },
              child: Text(v),
            ),
          ))).values.toList(),
      ),
      drawer: isNotLarge ? Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: _navItems.map((k, v) => MapEntry(k,
            ListTile(
              onTap: () {
                Navigator.of(context).pushNamed(k);
              },
              title: Text(v),
            ))).values.toList(),
        ),
      ) : null,
      body: widget.child != null ? Center(child: widget.child) : null,
    );
  }
}
