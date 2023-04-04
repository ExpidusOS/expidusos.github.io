import 'package:flutter/material.dart';

class SimpleCard extends StatelessWidget {
  SimpleCard({
    Key? key,
    this.margin = const EdgeInsets.all(8.0),
    this.children = const <Widget>[],
  }) : super(key: key);

  final EdgeInsetsGeometry? margin;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) =>
    Card(
      margin: this.margin,
      child: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: children,
        ),
      ),
    );
}
