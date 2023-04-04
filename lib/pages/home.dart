import 'dart:async';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:expidus_website/layouts.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key, required this.themeNotifier}) : super(key: key);

  final ValueNotifier<ThemeMode> themeNotifier;

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) =>
    DefaultLayout(
      themeNotifier: widget.themeNotifier,
      child: ListView(
        padding: EdgeInsets.all(16.0),
        children: [
          Container(
            height: MediaQuery.of(context).size.height / 2.95,
            decoration: BoxDecoration(
              image: DecorationImage(
                fit: BoxFit.cover,
                image: AssetImage('assets/img/expidus.jpg'),
              ),
            ),
            child: Align(
              alignment: Alignment.bottomRight,
              child: Card(
                margin: EdgeInsets.all(16.0),
                child: Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        'Introducing ExpidusOS',
                        style: Theme.of(context).textTheme.headlineLarge,
                      ),
                      Text(
                        'A modern operating system for mobile and desktop devices.',
                        style: Theme.of(context).textTheme.bodyLarge,
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
}
