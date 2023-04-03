import 'package:flutter/material.dart';
import 'package:expidus_website/layouts.dart';

class DownloadPage extends StatefulWidget {
  const DownloadPage({Key? key, required this.themeNotifier}) : super(key: key);

  final ValueNotifier<ThemeMode> themeNotifier;

  @override
  State<DownloadPage> createState() => _DownloadPageState();
}

class _DownloadPageState extends State<DownloadPage> {
  @override
  Widget build(BuildContext context) =>
    DefaultLayout(
      themeNotifier: widget.themeNotifier,
      child: Center(child: const Text('Hello, world')),
    );
}
