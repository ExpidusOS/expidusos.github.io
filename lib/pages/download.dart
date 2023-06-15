import 'package:flutter/material.dart';
import 'package:expidus_website/layouts.dart';

class DownloadPage extends StatefulWidget {
  const DownloadPage({ super.key });

  @override
  State<DownloadPage> createState() => _DownloadPageState();
}

class _DownloadPageState extends State<DownloadPage> {
  @override
  Widget build(BuildContext context) =>
    const DefaultLayout(
      child: Center(child: Text('Hello, world')),
    );
}
