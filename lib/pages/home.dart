import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key, required this.themeNotifier}) : super(key: key);

  final ValueNotifier<ThemeMode> themeNotifier;

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) =>
    Scaffold(
      appBar: AppBar(
        title: const Text('ExpidusOS'),
      ),
      body: Center(child: const Text('Hello, world')),
    );
}
