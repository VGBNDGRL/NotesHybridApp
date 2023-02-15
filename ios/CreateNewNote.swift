//
//  CreateNewNote.swift
//  NotesHybridApp
//
//  Created by Anna Flores on 2/15/23.
//

import Foundation
import UIKit
import React

@objc(CreateNewNote)
class CreateNewNote : NSObject {
  
  
  // This is the method exposed to React Native. It can't handle
  // the first parameter being named. http://stackoverflow.com/a/39840952/155186
  @objc func showAlert() {
    var newNote: [String] = []
    DispatchQueue.main.async {
      let alert = UIAlertController(
        title: "Enter Your New Note",
        message: "Add a title and body",
        preferredStyle: .alert
      )
      
      // Add title and body fields
      alert.addTextField { field in
        field.placeholder = "Title"
        field.returnKeyType = .next
      }
      
      alert.addTextField { field in
        field.placeholder = "Body"
        field.returnKeyType = .done
      }
      
      alert.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))
      alert.addAction(UIAlertAction(title: "Save", style: .default, handler: { _ in
        guard let fields = alert.textFields, fields.count == 2 else {
          return
        }
        let titleField = fields[0]
        let bodyField = fields[1]
        guard let title = titleField.text, !title.isEmpty,
              let body = bodyField.text, !body.isEmpty else {
          print("Invalid entries")
          return
        }
        let currentDateTime = Date()
        let formatter = DateFormatter()
        formatter.timeStyle = .medium
        formatter.dateStyle = .long
        let timeStamp = formatter.string(from: currentDateTime)
        
        newNote.append(title)
        newNote.append(body)
        newNote.append(timeStamp)
        
        print("Title: \(title)")
        print("Body: \(body)")
      }))
      
        var rootViewController = UIApplication.shared.keyWindow?.rootViewController
        if let navigationController = rootViewController as? UINavigationController {
          rootViewController = navigationController.viewControllers.first
        }
        if let tabBarController = rootViewController as? UITabBarController {
          rootViewController = tabBarController.selectedViewController
        }
        rootViewController?.present(alert, animated: true, completion: nil)
    }
  }
  
  @objc
  static func requiresMainQueueSetup() ->Bool{
    return true;
  }
  
}

