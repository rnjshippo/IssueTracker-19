//
//  ListCollectionViewProtocol.swift
//  IssueTracker
//
//  Created by 조기현 on 2020/11/02.
//  Copyright © 2020 남기범. All rights reserved.
//

import UIKit

protocol ListCollectionViewProtocol {
	associatedtype Item: SectionItem

	typealias DataSource = UICollectionViewDiffableDataSource<Section, Item>
	typealias Snapshot = NSDiffableDataSourceSnapshot<Section, Item>
	
	var list: [Item] { get set }
	var dataSource: DataSource? { get set }
	var collectionView: UICollectionView { get set }
	
	func configureHierarchy()
	func configureDataSource()
	func createLayout() -> UICollectionViewLayout
}

extension ListCollectionViewProtocol {
	func updateList() {
		var snapshot = Snapshot()
		snapshot.appendSections([.main])
		snapshot.appendItems(list)
		dataSource?.apply(snapshot, animatingDifferences: false)
	}
}
