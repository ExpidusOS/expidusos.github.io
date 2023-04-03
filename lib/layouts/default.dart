import 'package:flutter/material.dart';
import 'package:expidus_website/utils.dart' show AutoScaler;

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
        actions: isNotLarge ? null : <Widget>[
          TextButton(
            onPressed: () {
              Navigator.of(context).pushNamed('/');
            },
            child: const Text('Home')
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).pushNamed('/download');
            },
            child: const Text('Download')
          ),
        ],
      ),
      drawer: isNotLarge ? Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [],
        ),
      ) : null,
      body: widget.child,
    );
  }
}
