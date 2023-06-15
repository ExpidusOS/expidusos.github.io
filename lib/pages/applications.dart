import 'package:flutter/material.dart';
import 'package:expidus_website/layouts.dart';

class ApplicationsPage extends StatefulWidget {
  const ApplicationsPage({ super.key });

  @override
  State<ApplicationsPage> createState() => _DownloadPageState();
}

class _DownloadPageState extends State<ApplicationsPage> {
  @override
  Widget build(BuildContext context) =>
      const DefaultLayout(
        child: Center(child: Text('Hello, world')),
      );
}
